defmodule Vandross.Models.Users do
  import Ecto.Query
  alias Vandross.Models.User
  alias Vandross.Repo

  def get(id) do
    Repo.get(User, id)
  end

  def get_by_email(email) do
    query = from u in User,
            where: u.email == ^email,
            select: u
    
    Repo.one(query)
  end

  def create(user) do
    case Vex.errors(user) do
      [] ->
        user = %{ user | password: encrypt_password(user.password) }
        {:ok, Repo.insert(user)}
      errors ->
        {:error, errors}       
    end
  end

  def update(id, email, password) do
    case get(id) do
      nil ->
        {:error, [{:error, :user, :user, "user not found"}]}
      updating_user ->
        if email do
          updating_user = %{updating_user | email: email }
        end

        if password do
          updating_user = %{updating_user | password: password }
        end

        case Vex.errors(updating_user) do
          [] ->
            user = %{ updating_user | password: encrypt_password(updating_user.password) }
            {:ok, Repo.update(user)}
          errors ->
            {:error, errors}       
        end
    end
  end

  def delete(id) do
    Repo.get(User, id)
    |> Repo.delete
  end

  def credentials_ok?(email, password) do
    case get_by_email(email) do
      nil ->
        false
      user ->
        check_password(password, user.password)
    end
  end

  def encrypt_password(password) do

    password = String.to_char_list(password)
    work_factor = Application.get_env(:vandross, :password_work_factor)

    {:ok, salt} = :bcrypt.gen_salt(work_factor)
    {:ok, hash} = :bcrypt.hashpw(password, salt)
    :erlang.list_to_binary(hash)
  end

  def check_password(password, password_hash) do
    password = String.to_char_list(password)
    {:ok, hash} = :bcrypt.hashpw(password, password_hash)
    hash = :erlang.list_to_binary(hash)
    secure_compare(hash, password_hash)
  end

  defp secure_compare(left, right) do
    if byte_size(left) == byte_size(right) do
      arithmetic_compare(left, right, 0) == 0
    else
      false
    end
  end

  defp arithmetic_compare(<<x, left :: binary>>, <<y, right :: binary>>, acc) do
    import Bitwise
    arithmetic_compare(left, right, acc ||| (x ^^^ y))
  end

  defp arithmetic_compare("", "", acc) do
    acc
  end
end
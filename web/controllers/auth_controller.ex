defmodule Vandross.AuthController do
  use Vandross.Web, :controller
  alias Vandross.Models.Users

  plug :action

  def login(conn, params) do
    case generate_token(params["email"], params["password"]) do
      {:ok, jwt} ->

        conn
        |> put_status(200)
        |> json(%{ token: jwt })
        |> halt

      {:error, _} ->
        error = %{ status_code: 401, error: "Unable to authenticate", "description": "Invalid Username or Password" }
        
        conn
        |> put_status(401)
        |> json(error)
        |> halt
    end
  end

  defp generate_token(email, password) do
    case Users.credentials_ok?(email, password) do
      false ->
        {:error, "Invalid Username or Password"}
      true ->
        secret = Application.get_env(:vandross, :key)
        user = Users.get_by_email(email)

        expires = Joken.Utils.get_current_time() + Application.get_env(:vandross, :token_expires)
        Joken.Token.encode(secret, Vandross.Codec, %{user_id: user.id, exp: expires})       
    end
  end
end
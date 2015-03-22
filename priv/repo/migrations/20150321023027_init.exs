defmodule Vandross.Repo.Migrations.Init do
  use Ecto.Migration

  def change do
    create table(:user) do
      add :email,    :string, size: 255
      add :password, :string
    end
  end
end

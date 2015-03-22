defmodule Vandross.Models.User do
  use Ecto.Model
  use Vex.Struct

  schema "user" do
    field :email
    field :password
  end

  validates :email, presence: true, length: [max: 255]
  validates :password, presence: true
end
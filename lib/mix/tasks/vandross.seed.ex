defmodule Mix.Tasks.Vandross.Seed do
  use Mix.Task
  alias Vandross.Models.User
  alias Vandross.Models.Users
  
 @shortdoc "Seeds users"

  def run(args) do
    Mix.Task.run "app.start", args

    user1 = %User{email: "blah@example.com", password: "password"}
    user2 = %User{email: "foo@example.com", password: "password"}


    Users.create(user1)
    Users.create(user2)
  end

end
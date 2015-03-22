defmodule Vandross.Endpoint do
  use Phoenix.Endpoint, otp_app: :vandross

  # Serve at "/" the given assets from "priv/static" directory
  plug Plug.Static,
    at: "/", from: :vandross,
    only: ~w(css images js jspm_packages config.js favicon.ico robots.txt)

  plug Plug.Logger

  # Code reloading will only work if the :code_reloader key of
  # the :phoenix application is set to true in your config file.
  plug Phoenix.CodeReloader

  plug Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Poison

  plug Plug.MethodOverride
  plug Plug.Head

  plug Plug.Session,
    store: :cookie,
    key: "_vandross_key",
    signing_salt: "wQt+2OsH",
    encryption_salt: "fjDXNVqA"

  plug :router, Vandross.Router
end

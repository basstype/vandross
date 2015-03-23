defmodule Vandross.Router do
  use Phoenix.Router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug PlugJwt, secret: Application.get_env(:vandross, :key), json_module: Vandross.Codec
  end

  pipeline :api_anonymous do
    plug :accepts, ["json"]
  end

  scope "/", Vandross do
    pipe_through :browser

    get "/", PageController, :index
  end

  scope "/api", Vandross do
     pipe_through :api_anonymous

     post "/auth", AuthController, :login

  end

  scope "/api", Vandross do
     pipe_through :api

     get "/hue/bridge", HueController, :bridge
     get "/hue/lights", HueController, :lights
     get "/hue/lights/:id", HueController, :light_info

  end

  socket "/ws", Vandross do
    channel "hue:*", HueChannel
    #channel "nest:*", NestChannel
  end
end

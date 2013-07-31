TflCameras::Application.routes.draw do
  resources :cameras
  root to: "cameras#index"

end

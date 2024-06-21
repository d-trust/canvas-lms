require 'rails_helper'

RSpec.describe "Login::Passkeys", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/login/passkey/index"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /create" do
    it "returns http success" do
      get "/login/passkey/create"
      expect(response).to have_http_status(:success)
    end
  end

end

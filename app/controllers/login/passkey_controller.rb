class Login::PasskeyController < ApplicationController
  include Login::Shared
  def registration_challenge
    options = relying_party.options_for_registration(
      user: {
        name: "Daiya Yuyama",
        id: 0x7373737373
      },
      attestation: "none",
      authenticator_selection: {
        authenticator_attachment: "platform",
        resident_key: "discouraged",
        user_verification: "required"
      }
    )
    session[:current_registration] = { challenge: options.challenge }
    respond_to do |format|
      format.any { render json: options }
    end
  end

  def authentication_challenge
    options = relying_party.options_for_authentication(
      allow: 1,
      user_verification: "required"
    )

    session[:authentication_challenge] = options.challenge
    render json: options
  end
end

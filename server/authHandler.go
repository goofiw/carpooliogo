package server

import (
	"fmt"
	"github.com/stretchr/gomniauth"
	"github.com/stretchr/gomniauth/providers/google"
	"github.com/stretchr/objx"
	"io"
	"net/http"
)

func setUpProvider() {
	// setup the providers
	gomniauth.SetSecurityKey(MySecurityKey)
	gomniauth.WithProviders(
		google.New(GoogleClientId, GoogleSecret, "http://localhost:8080/auth/google/callback"),
	)
}

func GoogleLoginHandler(w http.ResponseWriter, r *http.Request) {
	setUpProvider()

	providerName := "google"

	provider, err := gomniauth.Provider(providerName)
	if err != nil {
		panic(err)
	}

	state := gomniauth.NewState("after", "success")

	// This code borrowed from goweb example and not fixed.
	// if you want to request additional scopes from the provider,
	// pass them as login?scope=scope1,scope2
	//options := objx.MSI("scope", ctx.QueryValue("scope"))

	authUrl, err := provider.GetBeginAuthURL(state, nil)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// redirect
	http.Redirect(w, r, authUrl, http.StatusFound)

}

func GoogleCallbackHandler(w http.ResponseWriter, r *http.Request) {
	setUpProvider()

	providerName := "google"

	provider, err := gomniauth.Provider(providerName)
	if err != nil {
		panic(err)
	}

	omap, err := objx.FromURLQuery(r.URL.RawQuery)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	creds, err := provider.CompleteAuth(omap)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	/*
	   // This code borrowed from goweb example and not fixed.
	   // get the state
	   state, err := gomniauth.StateFromParam(ctx.QueryValue("state"))
	   if err != nil {
	     http.Error(w, err.Error(), http.StatusInternalServerError)
	     return
	   }
	   // redirect to the 'after' URL
	   afterUrl := state.GetStringOrDefault("after", "error?e=No after parameter was set in the state")
	*/

	// load the user
	user, userErr := provider.GetUser(creds)

	if userErr != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	data := fmt.Sprintf("%#v", user)
	io.WriteString(w, data)

	// redirect
	//return goweb.Respond.WithRedirect(ctx, afterUrl)

}

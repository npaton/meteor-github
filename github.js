var userAgent = "Meteor";
if (Meteor.release) userAgent += "/" + Meteor.release;

var headers = {
    "Accept": "application/vnd.github.v3+json",
    "User-Agent": userAgent
};

var baseGithubApiUrl = "https://api.github.com";

GithubApi = function (accessToken) {
    this.accessToken = accessToken;
};

GithubApi.forUser = function(user) {
    var token = GithubApi.credentialsForUser(user);
    if (!token) return;

    return new GithubApi(token);
};

GithubApi.credentialsForUser = function(user) {
    if (!user.services || !user.services.github) return;
    var github = user.services.github;
    if (!github.accessToken) return;
    return github.accessToken;
};

GithubApi.prototype = {
    constructor: GithubApi,

    call: function (method, path, params) {
        path = baseGithubApiUrl + path.replace(baseGithubApiUrl, "");
        var authHeaders = { "Authorization": "token "+this.accessToken },
            options = { headers: _.extend(headers, authHeaders) };

        if (params) options.data = params;

        try {
            return HTTP.call(method, path, options).data;
        } catch (err) {
            var msg = "Github API: Failed to " + method.toUpperCase() + " " +
                        path + ". " + err.message;
            throw _.extend(new Error(msg), { response: err.response });
        }
    },

    get: function (path, params) {
        return this.call("GET", path, params);
    },

    post: function (path, params) {
        return this.call("POST", path, params);
    },

    put: function (path, params) {
        return this.call("PUT", path, params);
    },

    delete: function (path, params) {
        return this.call("DELETE", path, params);
    }
};

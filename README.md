# HTTP ASTERISK DIALPLAN EDITOR

## About this repository

A small http service to perform basic editions into an Asterisk dialplan configuration file and reload the service.
It can be consumed both by web apps to perform modifications on demand, but also making HTTP requests directly from a phone extension through the `CURL` utility.

## How to install

May not work entirely on Windows systems.

1. Clone the repository by performing a git clone command.
2. Install dependencies by running `npm run i`
3. Create a default config file by running `npm run config:init`
4. Modify the `.env` file with your desired parameters. Please note, listening on a network interface different than `localhost` IS NOT RECOMMENDED. This is a non-protected service, and **it should not be exposed over the Internet.**
5. You can check that everything works as expected by running tests with `npm run test`
6. Run manually by `npm run start` or in the background with `forever` by `npm run start:background`

## How to use

Although this service can be consumed from any kind of software (web apps, cli apps, desktop software, etc.), it has been developed with dialplan scripts in mind.

**Here is an example:**

Let's suppose that we have a publicly accessible phone number, offered by a SIP provider, and all calls received on that number are redirected to the `public` context, and the `home` extension.

Our dialplan would be similar to this:

```
[public]
exten => home,1,Dial(SIP/finalUserToRing, 60)

[private]
```

If there's the need to deviate calls from `finalUserToRing` to `anotherUser`, in order to avoid having too many real phone numbers, we could add an extension which will make an http request to edit the dialplan.

```
[public]
exten => home,1,Dial(SIP/finalUserToRing, 60)

[private]
exten => 1,1,Verbose(0, ${CURL(http://127.0.0.1:300/public/home/1/dial(SIP%2FanotherUser, 120))})
```

The new extension, performs an http GET request to **HTTP ASTERISK DIALPLAN EDITOR**, following this format:

`http://ipAddress:port/:context/:extension/:priority/:command`

It's possible to modify parameters to perform different editions. 
Have fun! :)

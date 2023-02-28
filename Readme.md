# NewPipe | Fast Export Subscriptions Youtube

The tradicional way to import your subscriptions to NewPipe is to export the file from the service Google User Data, but this is a slow way.
This sample and fast way export your subscriptions to NewPipe via Deep Link (in development) or file.

## How to use

1. Create a app on Google Console and add the YouTube Data API v3
2. Get the Client ID and Client Secret and configure the domains on Google Console
3. Download this project, install the dependencies, configure `.env` file and run it
4. Now you can use the tool on http://localhost:3000 (if local, otherwise the domain you configured with HOST and PORT env vars)

## How get via Deep link

1. Get the deep link of import from the tool (Ex.: `newpipe://import?youtube=`)
2. Put the deep link on params of redirect response (Ex.: `http://localhost:3000/youtube/export-subscribes?redirect=newpipe://import/youtube?=`)
3. Enter with your Google Account and accept the permissions
4. The tool will redirect you to the deep link and you can import the subscriptions

## How get via file

1. Go to (Ex.: `http://localhost:3000/youtube/export-subscribes?download=true`)
2. Enter with your Google Account and accept the permissions
3. Make the download of tool and import from the file

## How get via JSON

1. Go to `http://localhost:3000/youtube/export-subscribes`)
2. Enter with your Google Account and accept the permissions
3. And get the JSON response


## Questions
### But why is not in the NewPipe app?
The NewPipe app is designed not to work with proprietary Google APIs like Google Play Services.

### Will have others services?
Maybe not. But the project are easy to put news services, if you want to help, you can make a pull request. 
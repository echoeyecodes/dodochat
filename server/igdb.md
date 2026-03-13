Title: Getting Started

URL Source: https://api-docs.igdb.com/

Markdown Content:
[  NAV ](#) 

[  API](https://api-docs.igdb.com) 

[Shell](#) [Javascript](#) [Java/Unirest](#) [Kotlin/Fuel](#) [Swift](#) [Ruby](#) [Python](#) 

* [Getting Started](#getting-started)  
   * [Account Creation](#account-creation)  
   * [Authentication](#authentication)  
   * [Requests](#requests)  
   * [Rate Limits](#rate-limits)  
   * [Wrappers](#wrappers)
* [Examples](#examples)
* [Endpoints](#endpoints)  
   * [Age Rating](#age-rating)  
   * [Age Rating Category](#age-rating-category)  
   * [Age Rating Content Description](#age-rating-content-description)  
   * [Age Rating Content Description Type](#age-rating-content-description-type)  
   * [Age Rating Content Description V2](#age-rating-content-description-v2)  
   * [Age Rating Organization](#age-rating-organization)  
   * [Alternative Name](#alternative-name)  
   * [Artwork](#artwork)  
   * [Artwork Type](#artwork-type)  
   * [Character](#character)  
   * [Character Gender](#character-gender)  
   * [Character Mug Shot](#character-mug-shot)  
   * [Character Specie](#character-specie)  
   * [Collection](#collection)  
   * [Collection Membership](#collection-membership)  
   * [Collection Membership Type](#collection-membership-type)  
   * [Collection Relation](#collection-relation)  
   * [Collection Relation Type](#collection-relation-type)  
   * [Collection Type](#collection-type)  
   * [Company](#company)  
   * [Company Logo](#company-logo)  
   * [Company Size](#company-size)  
   * [Company Status](#company-status)  
   * [Company Type](#company-type)  
   * [Company Type History](#company-type-history)  
   * [Company Website](#company-website)  
   * [Cover](#cover)  
   * [Date Format](#date-format)  
   * [Entity Type](#entity-type)  
   * [Event](#event)  
   * [Event Logo](#event-logo)  
   * [Event Network](#event-network)  
   * [External Game](#external-game)  
   * [External Game Source](#external-game-source)  
   * [Franchise](#franchise)  
   * [Game](#game)  
   * [Game Engine](#game-engine)  
   * [Game Engine Logo](#game-engine-logo)  
   * [Game Localization](#game-localization)  
   * [Game Mode](#game-mode)  
   * [Game Release Format](#game-release-format)  
   * [Game Status](#game-status)  
   * [Game Time To Beat](#game-time-to-beat)  
   * [Game Type](#game-type)  
   * [Game Version](#game-version)  
   * [Game Version Feature](#game-version-feature)  
   * [Game Version Feature Value](#game-version-feature-value)  
   * [Game Video](#game-video)  
   * [Genre](#genre)  
   * [Involved Company](#involved-company)  
   * [Keyword](#keyword)  
   * [Language](#language)  
   * [Language Support](#language-support)  
   * [Language Support Type](#language-support-type)  
   * [Multiplayer Mode](#multiplayer-mode)  
   * [Network Type](#network-type)  
   * [Platform](#platform)  
   * [Platform Family](#platform-family)  
   * [Platform Logo](#platform-logo)  
   * [Platform Type](#platform-type)  
   * [Platform Version](#platform-version)  
   * [Platform Version Company](#platform-version-company)  
   * [Platform Version Release Date](#platform-version-release-date)  
   * [Platform Website](#platform-website)  
   * [Player Perspective](#player-perspective)  
   * [Popularity Primitive](#popularity-primitive)  
   * [Popularity Type](#popularity-type)  
   * [Region](#region)  
   * [Release Date](#release-date)  
   * [Release Date Region](#release-date-region)  
   * [Release Date Status](#release-date-status)  
   * [Report](#report)  
   * [Report Type](#report-type)  
   * [Screenshot](#screenshot)  
   * [Search](#search)  
   * [Theme](#theme)  
   * [Website](#website)  
   * [Website Type](#website-type)
* [PopScore](#popscore)  
   * [Introducing IGDB PopScore - Your key to tracking the latest trends in the video game market.](#introducing-igdb-popscore---your-key-to-tracking-the-latest-trends-in-the-video-game-market)  
   * [Currently available PopScore primitives](#currently-available-popscore-primitives)  
   * [How to use Popularity API](#how-to-use-popularity-api)
* [Webhooks](#webhooks)
* [CORS Proxy](#cors-proxy)  
   * [CORS](#cors)  
   * [Proxy](#proxy)
* [Reference](#reference)  
   * [Images](#images)  
   * [Fields](#fields)  
   * [Exclude](#exclude)  
   * [Expander](#expander)  
   * [Filters](#filters)  
   * [Sorting](#sorting)  
   * [Search](#search-1)  
   * [Pagination](#pagination)  
   * [Protocol Buffers](#protocol-buffers)  
   * [Tag Numbers](#tag-numbers)  
   * [Multi-Query](#multi-query)  
   * [APICalypse](#apicalypse-1)
* [Migration Enums to Tables](#migration-enums-to-tables)  
   * [Important Changes Coming to the IGDB API](#important-changes-coming-to-the-igdb-api)  
   * [What is Changing?](#what-is-changing)  
   * [Migration Timeline](#migration-timeline)  
   * [Questions or Concerns?](#questions-or-concerns)
* [Partnership](#partnership)  
   * [Data Dumps](#data-dumps)
* [FAQ](#faq)  
   * [Business related FAQ](#business-related-faq)  
   * [Technical related FAQ](#technical-related-faq)
* [Support](#support)
* [License](#license)

# Getting Started

One of the principles behind IGDB.com is accessibility of data. We wish to share the data with anyone who wants to build cool video game oriented websites, apps and services.

This means that you are not only contributing to the value of IGDB but to thousands of other projects as well. We are looking forward to see what exciting game related projects you come up with. Happy coding!

For a high level overview of our juicy data, check out the [endpoints section](#endpoints).

START USING US NOW, IT'S FREE!

## Account Creation

In order to use our API, you must have a Twitch Account.

1. Sign Up with [Twitch](https://dev.twitch.tv/login) for a free account
2. Ensure you have Two Factor Authentication [enabled](https://www.twitch.tv/settings/security)
3. Register your application in the [Twitch Developer Portal](https://dev.twitch.tv/console/apps/create)  
   * The OAuth Redirect URL field is not used by IGDB. Please add ’localhost’ to continue.  
   * The Client Type must be set to `Confidential` to generate Client Secrets
4. [Manage](https://dev.twitch.tv/console/apps) your newly created application
5. Generate a Client Secret by pressing \[New Secret\]
6. Take note of the Client ID and Client Secret

The IGDB.com API is free for **non-commercial** usage under the terms of the [Twitch Developer Service Agreement](https://www.twitch.tv/p/legal/developer-agreement/).

**Note:** We offer commercial partnership for users with a commercial need in their projects. For more details on that process please reach out to [partner@igdb.com](mailto: partner@igdb.com) 

## Authentication

Now that you have a Client ID and Client Secret you will be authenticating as a Twitch Developer using Oauth2.  
Detailed information can be found in the [Twitch Developer Docs](https://dev.twitch.tv/docs/authentication).

Make a `POST` request to `https://id.twitch.tv/oauth2/token` with the following query string parameters, substituting your Client ID and Client Secret accordingly.

`client_id=Client ID`

`client_secret=Client Secret`

`grant_type=client_credentials`

### Example

If your Client ID is `abcdefg12345` and your Client Secret is `hijklmn67890`, the whole url should look like the following.

```yaml
POST: https://id.twitch.tv/oauth2/token?client_id=abcdefg12345&client_secret=hijklmn67890&grant_type=client_credentials

```

The response from this will be a json object containing the access token and the number of second until the token expires.

```json
{
  "access_token": "access12345token",
  "expires_in": 5587808,
  "token_type": "bearer"
}

```

**Note:** The _expires\_in_ shows you the number of seconds before the _access\_token_ will expire and must be refreshed.

## Requests

* Most of the requests to the API will use the `POST` method
* The base URL is: **<https://api.igdb.com/v4>**
* You define which endpoint you wish to query by appending `/{endpoint name}` to the base URL eg. **<https://api.igdb.com/v4/games>**
* Include your `Client ID` and `Access Token` in the `HEADER` of your request so that your headers look like the following.  
   * Take special care of the capitalisation. `Bearer` should be hard-coded infront of your `access_token`

```yaml
Client-ID: Client ID
Authorization: Bearer access_token

```

* You use the `BODY` of your request to specify the fields you want to retrieve as well as any other filters, sorting etc

### Example

If your Client ID is `abcdefg12345` and your access\_token is `access12345token`, a simple request to get information about 10 games would be.

```yaml
POST: https://api.igdb.com/v4/games
Client-ID: abcdefg12345
Authorization: Bearer access12345token
Body: "fields *;"

```

**Note:** If you are trying to make these requests via the Browser you will run into CORS errors as the API does not allow requests directly from browsers. You can read more about CORS and how to go around this issue in the [CORS Proxy](#cors-proxy) section

### More Examples

You can find some examples requests [here](#examples)

## Rate Limits

There is a rate limit of **4 requests per second**. If you go over this limit you will receive a response with status code `429 Too Many Requests`.

You are able to have up to 8 _open_ requests at any moment in time. This can occur if requests take longer than 1 second to respond when multiple requests are being made.

## Wrappers

Get setup quickly by using one of these wrappers!

### Apicalypse

* [NodeJS](https://github.com/igdb/node-apicalypse)
* [JVM/Kotlin/Java](https://github.com/husnjak/IGDB-API-JVM)
* [Swift](https://github.com/husnjak/IGDB-SWIFT-API)
* [Python](https://github.com/twitchtv/igdb-api-python)

### Third Party

* [PHP/Laravel](https://github.com/marcreichel/igdb-laravel)
* [GO](https://github.com/Henry-Sarabia/apicalypse)
* [Ruby](https://github.com/ad2games/ruby-apicalypse)
* [C#/.NET](https://github.com/kamranayub/igdb-dotnet)
* [Deno](https://github.com/killoblanco/igdb-api-deno)

### Third Party Documentation

* [OpenAPI Documentation](https://igdb-openapi.s-crypt.co/)
* [Postman Collection](https://www.postman.com/aceprosports/workspace/public/collection/18853756-4367eb1d-3f6b-41ee-96cb-3ccb3d094a5c)

# Examples

It’s recommended to try out your queries in an API viewer like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) before using code. This helps you find problems a lot sooner!

Postman setup example





### A very basic example to retrieve the name for 10 games.

**<https://api.igdb.com/v4/games/>**

```
fields name; limit 10;

```

### Get all information from a specific game

1942, is the ID of a game.

**<https://api.igdb.com/v4/games/>**

```
fields *; where id = 1942;

```

### Exclude irrelevant data from your query

Remove alternative\_name from your result query

**<https://api.igdb.com/v4/platforms/>**

```
fields *;
exclude alternative_name;

```

### Get all games from specific genres

Notice how you can comma separate multiple IDs (8, 9, and 11). You can do this with games, companies and anything else. Also note that when you have multiple IDs they have to be surrounded by a parenthesis. Single ids can be queried both with and without the parenthesis.

**<https://api.igdb.com/v4/genres/>**

```
fields *; where id = (8,9,11);

```

### Count total games that have a rating higher than 75

**<https://api.igdb.com/v4/games/count>**

```
where rating > 75;

```

### Order by rating

**<https://api.igdb.com/v4/games/>**

```
fields name,rating; sort rating desc;

```

### Coming soon games for Playstation 4

**<https://api.igdb.com/v4/release%5Fdates/>**

```
fields *; where game.platforms = 48 & date > 1538129354; sort date asc;

```

1538129354: Is the timestamp in milliseconds of 28/09/2018 (This you need to generate yourself) 48 Is the platform id of Playstation 4.

### Recently released games for Playstation 4

```
fields *; where game.platforms = 48 & date < 1538129354; sort date desc;

```

**Note:** "where game.platforms = 48 & date > 1538129354" It is possible to use either & (AND) or | (OR) to combine filters to better define the behaviour of your query

### Search, return certain fields.

**<https://api.igdb.com/v4/games/>**

```
search "Halo"; fields name,release_date.human;

```

**<https://api.igdb.com/v4/games/>**

```
fields name, involved_companies; search "Halo";

```

### Search games but exclude versions (editions)

**<https://api.igdb.com/v4/games/>**

```
fields name, involved_companies; search "Assassins Creed"; where version_parent = null;

```

This will return search results with ID and name of the game but exclude editions such as “Collectors Edition”.

### Searching all endpoints

**Note:** Search is now also it's own endpoint. Search is usable on: Characters, Collections, Games, Platforms, and Themes

The example below searches for “Sonic the Hedgehog” which will find the Character Sonic, the collection Soninc the Hedgehog. And of course also several games with names containing Sonic the Hedgehog.

**<https://api.igdb.com/v4/search>**

```
fields *; search "sonic the hedgehog"; limit 50;

```

### Get versions (editions) of a game

**<https://api.igdb.com/v4/game%5Fversions/>**

```
fields game.name,games.name; where game = 28540;

```

The resulting object will contain all games that are a version of the game with id 28540

### Get the parent game for a version

**<https://api.igdb.com/v4/games/>**

```
fields version_parent.*; where id = 39047;

```

The resulting object will contain all main games

### Get all games that are playstation 4 exclusives

```
fields name,category,platforms;
where category = 0 & platforms = 48;

```

### Get all games that are only released on playstation 4 AND PC

```
fields name,category,platforms;
where category = 0 & platforms = {48,6};

```

# Endpoints

## Age Rating

```shell
curl 'https://api.igdb.com/v4/age_ratings' \
-d 'fields category,checksum,content_descriptions,organization,rating,rating_category,rating_content_descriptions,rating_cover_url,synopsis;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/age_ratings",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields category,checksum,content_descriptions,organization,rating,rating_category,rating_content_descriptions,rating_cover_url,synopsis;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/age_ratings")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields category,checksum,content_descriptions,organization,rating,rating_category,rating_content_descriptions,rating_cover_url,synopsis;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/age_ratings".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields category,checksum,content_descriptions,organization,rating,rating_category,rating_content_descriptions,rating_cover_url,synopsis;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/age_ratings")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields category,checksum,content_descriptions,organization,rating,rating_category,rating_content_descriptions,rating_cover_url,synopsis;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/age_ratings'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields category,checksum,content_descriptions,organization,rating,rating_category,rating_content_descriptions,rating_cover_url,synopsis;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/age_ratings', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields category,checksum,content_descriptions,organization,rating,rating_category,rating_content_descriptions,rating_cover_url,synopsis;'})
print ("response: %s" % str(response.json()))

```

**Deprecated Fields:**

* `category`: DEPRECATED! Use `organization` instead
* `content_descriptions`: DEPRECATED! Use `rating_content_descriptions` instead
* `rating`: DEPRECATED! Use `rating_category` instead

Age Rating according to various rating organisations

### Request Path

`https://api.igdb.com/v4/age_ratings`

| field                         | type                                                                                  | description                                           |
| ----------------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| category                      | [Category Enum](#age-rating-enums)                                                    | DEPRECATED! Use organization instead                  |
| checksum                      | uuid                                                                                  | Hash of the object                                    |
| content\_descriptions         | Array of [ Age Rating Content Description](#age-rating-content-description) IDs       | DEPRECATED! Use rating\_content\_descriptions instead |
| organization                  | Reference ID for [ Age Rating Organization](#age-rating-organization)                 | The organization that has issued a specific rating    |
| rating                        | [Rating Enum](#age-rating-enums)                                                      | DEPRECATED! Use rating\_category instead              |
| rating\_category              | Reference ID for [ Age Rating Category](#age-rating-category)                         | The category of a rating                              |
| rating\_content\_descriptions | Array of [ Age Rating Content Description V2](#age-rating-content-description-v2) IDs | The rating content descriptions                       |
| rating\_cover\_url            | String                                                                                | The url for the image of a age rating                 |
| synopsis                      | String                                                                                | A free text motivating a rating                       |

### Age Rating Enums

category

| name       | value |
| ---------- | ----- |
| ESRB       | 1     |
| PEGI       | 2     |
| CERO       | 3     |
| USK        | 4     |
| GRAC       | 5     |
| CLASS\_IND | 6     |
| ACB        | 7     |

rating

| name                 | value |
| -------------------- | ----- |
| Three                | 1     |
| Seven                | 2     |
| Twelve               | 3     |
| Sixteen              | 4     |
| Eighteen             | 5     |
| RP                   | 6     |
| EC                   | 7     |
| E                    | 8     |
| E10                  | 9     |
| T                    | 10    |
| M                    | 11    |
| AO                   | 12    |
| CERO\_A              | 13    |
| CERO\_B              | 14    |
| CERO\_C              | 15    |
| CERO\_D              | 16    |
| CERO\_Z              | 17    |
| USK\_0               | 18    |
| USK\_6               | 19    |
| USK\_12              | 20    |
| USK\_16              | 21    |
| USK\_18              | 22    |
| GRAC\_ALL            | 23    |
| GRAC\_Twelve         | 24    |
| GRAC\_Fifteen        | 25    |
| GRAC\_Eighteen       | 26    |
| GRAC\_TESTING        | 27    |
| CLASS\_IND\_L        | 28    |
| CLASS\_IND\_Ten      | 29    |
| CLASS\_IND\_Twelve   | 30    |
| CLASS\_IND\_Fourteen | 31    |
| CLASS\_IND\_Sixteen  | 32    |
| CLASS\_IND\_Eighteen | 33    |
| ACB\_G               | 34    |
| ACB\_PG              | 35    |
| ACB\_M               | 36    |
| ACB\_MA15            | 37    |
| ACB\_R18             | 38    |
| ACB\_RC              | 39    |

## Age Rating Category

```shell
curl 'https://api.igdb.com/v4/age_rating_categories' \
-d 'fields checksum,created_at,organization,rating,updated_at;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/age_rating_categories",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,created_at,organization,rating,updated_at;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/age_rating_categories")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,created_at,organization,rating,updated_at;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/age_rating_categories".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,created_at,organization,rating,updated_at;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/age_rating_categories")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,created_at,organization,rating,updated_at;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/age_rating_categories'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,created_at,organization,rating,updated_at;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/age_rating_categories', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,created_at,organization,rating,updated_at;'})
print ("response: %s" % str(response.json()))

```

The rating category from the organization

### Request Path

`https://api.igdb.com/v4/age_rating_categories`

| field        | type                                                                  | description                                               |
| ------------ | --------------------------------------------------------------------- | --------------------------------------------------------- |
| checksum     | uuid                                                                  | Hash of the object                                        |
| created\_at  | datetime                                                              | Date this was initially added to the IGDB database        |
| organization | Reference ID for [ Age Rating Organization](#age-rating-organization) | The rating organization                                   |
| rating       | String                                                                | The rating name                                           |
| updated\_at  | datetime                                                              | The last date this entry was updated in the IGDB database |

## Age Rating Content Description

```shell
curl 'https://api.igdb.com/v4/age_rating_content_descriptions' \
-d 'fields category,checksum,description;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/age_rating_content_descriptions",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields category,checksum,description;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/age_rating_content_descriptions")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields category,checksum,description;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/age_rating_content_descriptions".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields category,checksum,description;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/age_rating_content_descriptions")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields category,checksum,description;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/age_rating_content_descriptions'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields category,checksum,description;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/age_rating_content_descriptions', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields category,checksum,description;'})
print ("response: %s" % str(response.json()))

```

**Deprecated Fields:**

* `category`: DEPRECATED!

DEPRECATED! Use `age_rating_content_descriptions_v2` instead

### Request Path

`https://api.igdb.com/v4/age_rating_content_descriptions`

| field       | type                                                   | description        |
| ----------- | ------------------------------------------------------ | ------------------ |
| category    | [Category Enum](#age-rating-content-description-enums) | DEPRECATED!        |
| checksum    | uuid                                                   | Hash of the object |
| description | String                                                 |                    |

### Age Rating Content Description Enums

category

| name                                 | value |
| ------------------------------------ | ----- |
| ESRB\_alcohol\_reference             | 1     |
| ESRB\_animated\_blood                | 2     |
| ESRB\_blood                          | 3     |
| ESRB\_blood\_and gore                | 4     |
| ESRB\_cartoon\_violence              | 5     |
| ESRB\_comic\_mischief                | 6     |
| ESRB\_crude\_humor                   | 7     |
| ESRB\_drug\_reference                | 8     |
| ESRB\_fantasy\_violence              | 9     |
| ESRB\_intense\_violence              | 10    |
| ESRB\_language                       | 11    |
| ESRB\_lyrics                         | 12    |
| ESRB\_mature\_humor                  | 13    |
| ESRB\_nudity                         | 14    |
| ESRB\_partial\_nudity                | 15    |
| ESRB\_real\_gambling                 | 16    |
| ESRB\_sexual\_content                | 17    |
| ESRB\_sexual\_themes                 | 18    |
| ESRB\_sexual\_violence               | 19    |
| ESRB\_simulated\_gambling            | 20    |
| ESRB\_strong\_language               | 21    |
| ESRB\_strong\_lyrics                 | 22    |
| ESRB\_strong\_sexual content         | 23    |
| ESRB\_suggestive\_themes             | 24    |
| ESRB\_tobacco\_reference             | 25    |
| ESRB\_use\_of alcohol                | 26    |
| ESRB\_use\_of drugs                  | 27    |
| ESRB\_use\_of tobacco                | 28    |
| ESRB\_violence                       | 29    |
| ESRB\_violent\_references            | 30    |
| ESRB\_animated\_violence             | 31    |
| ESRB\_mild\_language                 | 32    |
| ESRB\_mild\_violence                 | 33    |
| ESRB\_use\_of drugs and alcohol      | 34    |
| ESRB\_drug\_and alcohol reference    | 35    |
| ESRB\_mild\_suggestive themes        | 36    |
| ESRB\_mild\_cartoon violence         | 37    |
| ESRB\_mild\_blood                    | 38    |
| ESRB\_realistic\_blood and gore      | 39    |
| ESRB\_realistic\_violence            | 40    |
| ESRB\_alcohol\_and tobacco reference | 41    |
| ESRB\_mature\_sexual themes          | 42    |
| ESRB\_mild\_animated violence        | 43    |
| ESRB\_mild\_sexual themes            | 44    |
| ESRB\_use\_of alcohol and tobacco    | 45    |
| ESRB\_animated\_blood and gore       | 46    |
| ESRB\_mild\_fantasy violence         | 47    |
| ESRB\_mild\_lyrics                   | 48    |
| ESRB\_realistic\_blood               | 49    |
| PEGI\_violence                       | 50    |
| PEGI\_sex                            | 51    |
| PEGI\_drugs                          | 52    |
| PEGI\_fear                           | 53    |
| PEGI\_discrimination                 | 54    |
| PEGI\_bad\_language                  | 55    |
| PEGI\_gambling                       | 56    |
| PEGI\_online\_gameplay               | 57    |
| PEGI\_in\_game\_purchases            | 58    |
| CERO\_love                           | 59    |
| CERO\_sexual\_content                | 60    |
| CERO\_violence                       | 61    |
| CERO\_horror                         | 62    |
| CERO\_drinking\_smoking              | 63    |
| CERO\_gambling                       | 64    |
| CERO\_crime                          | 65    |
| CERO\_controlled\_substances         | 66    |
| CERO\_languages\_and others          | 67    |
| GRAC\_sexuality                      | 68    |
| GRAC\_violence                       | 69    |
| GRAC\_fear\_horror\_threatening      | 70    |
| GRAC\_language                       | 71    |
| GRAC\_alcohol\_tobacco\_drug         | 72    |
| GRAC\_crime\_anti\_social            | 73    |
| GRAC\_gambling                       | 74    |
| CLASS\_IND\_violencia                | 75    |
| CLASS\_IND\_violencia\_extrema       | 76    |
| CLASS\_IND\_conteudo\_sexual         | 77    |
| CLASS\_IND\_nudez                    | 78    |
| CLASS\_IND\_sexo                     | 79    |
| CLASS\_IND\_sexo\_explicito          | 80    |
| CLASS\_IND\_drogas                   | 81    |
| CLASS\_IND\_drogas\_licitas          | 82    |
| CLASS\_IND\_drogas\_ilicitas         | 83    |
| CLASS\_IND\_linguagem\_impropria     | 84    |
| CLASS\_IND\_atos\_criminosos         | 85    |

## Age Rating Content Description Type

```shell
curl 'https://api.igdb.com/v4/age_rating_content_description_types' \
-d 'fields checksum,created_at,name,slug,updated_at;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/age_rating_content_description_types",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,created_at,name,slug,updated_at;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/age_rating_content_description_types")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,created_at,name,slug,updated_at;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/age_rating_content_description_types".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,created_at,name,slug,updated_at;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/age_rating_content_description_types")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,created_at,name,slug,updated_at;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/age_rating_content_description_types'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,created_at,name,slug,updated_at;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/age_rating_content_description_types', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,created_at,name,slug,updated_at;'})
print ("response: %s" % str(response.json()))

```

Age Rating Content Description Types

### Request Path

`https://api.igdb.com/v4/age_rating_content_description_types`

| field       | type     | description                                               |
| ----------- | -------- | --------------------------------------------------------- |
| checksum    | uuid     | Hash of the object                                        |
| created\_at | datetime | Date this was initially added to the IGDB database        |
| name        | String   |                                                           |
| slug        | String   | A url-safe, unique, lower-case version of the name        |
| updated\_at | datetime | The last date this entry was updated in the IGDB database |

## Age Rating Content Description V2

```shell
curl 'https://api.igdb.com/v4/age_rating_content_descriptions_v2' \
-d 'fields checksum,created_at,description,description_type,organization,updated_at;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/age_rating_content_descriptions_v2",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,created_at,description,description_type,organization,updated_at;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/age_rating_content_descriptions_v2")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,created_at,description,description_type,organization,updated_at;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/age_rating_content_descriptions_v2".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,created_at,description,description_type,organization,updated_at;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/age_rating_content_descriptions_v2")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,created_at,description,description_type,organization,updated_at;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/age_rating_content_descriptions_v2'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,created_at,description,description_type,organization,updated_at;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/age_rating_content_descriptions_v2', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,created_at,description,description_type,organization,updated_at;'})
print ("response: %s" % str(response.json()))

```

Age Rating Content Descriptions

### Request Path

`https://api.igdb.com/v4/age_rating_content_descriptions_v2`

| field             | type                                                                                          | description                                               |
| ----------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| checksum          | uuid                                                                                          | Hash of the object                                        |
| created\_at       | datetime                                                                                      | Date this was initially added to the IGDB database        |
| description       | String                                                                                        |                                                           |
| description\_type | Reference ID for [ Age Rating Content Description Type](#age-rating-content-description-type) | The age rating content description type                   |
| organization      | Reference ID for [ Age Rating Organization](#age-rating-organization)                         | The rating organization                                   |
| updated\_at       | datetime                                                                                      | The last date this entry was updated in the IGDB database |

## Age Rating Organization

```shell
curl 'https://api.igdb.com/v4/age_rating_organizations' \
-d 'fields checksum,created_at,name,updated_at;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/age_rating_organizations",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,created_at,name,updated_at;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/age_rating_organizations")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,created_at,name,updated_at;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/age_rating_organizations".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,created_at,name,updated_at;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/age_rating_organizations")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,created_at,name,updated_at;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/age_rating_organizations'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,created_at,name,updated_at;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/age_rating_organizations', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,created_at,name,updated_at;'})
print ("response: %s" % str(response.json()))

```

Age Rating according to various rating organisations

### Request Path

`https://api.igdb.com/v4/age_rating_organizations`

| field       | type     | description                                               |
| ----------- | -------- | --------------------------------------------------------- |
| checksum    | uuid     | Hash of the object                                        |
| created\_at | datetime | Date this was initially added to the IGDB database        |
| name        | String   | The title of an age rating organization                   |
| updated\_at | datetime | The last date this entry was updated in the IGDB database |

## Alternative Name

```shell
curl 'https://api.igdb.com/v4/alternative_names' \
-d 'fields checksum,comment,game,name;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/alternative_names",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,comment,game,name;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/alternative_names")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,comment,game,name;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/alternative_names".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,comment,game,name;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/alternative_names")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,comment,game,name;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/alternative_names'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,comment,game,name;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/alternative_names', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,comment,game,name;'})
print ("response: %s" % str(response.json()))

```

Alternative and international game titles

### Request Path

`https://api.igdb.com/v4/alternative_names`

| field    | type                           | description                                                                                       |
| -------- | ------------------------------ | ------------------------------------------------------------------------------------------------- |
| checksum | uuid                           | Hash of the object                                                                                |
| comment  | String                         | A description of what kind of alternative name it is (Acronym, Working title, Japanese title etc) |
| game     | Reference ID for [Game](#game) | The game this alternative name is associated with                                                 |
| name     | String                         | An alternative name                                                                               |

## Artwork

```shell
curl 'https://api.igdb.com/v4/artworks' \
-d 'fields alpha_channel,animated,artwork_type,checksum,game,height,image_id,url,width;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/artworks",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields alpha_channel,animated,artwork_type,checksum,game,height,image_id,url,width;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/artworks")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields alpha_channel,animated,artwork_type,checksum,game,height,image_id,url,width;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/artworks".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields alpha_channel,animated,artwork_type,checksum,game,height,image_id,url,width;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/artworks")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields alpha_channel,animated,artwork_type,checksum,game,height,image_id,url,width;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/artworks'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields alpha_channel,animated,artwork_type,checksum,game,height,image_id,url,width;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/artworks', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields alpha_channel,animated,artwork_type,checksum,game,height,image_id,url,width;'})
print ("response: %s" % str(response.json()))

```

Official artworks (resolution and aspect ratio may vary)

### Request Path

`https://api.igdb.com/v4/artworks`

| field          | type                                            | description                                              |
| -------------- | ----------------------------------------------- | -------------------------------------------------------- |
| alpha\_channel | boolean                                         |                                                          |
| animated       | boolean                                         |                                                          |
| artwork\_type  | Reference ID for [ Artwork Type](#artwork-type) | The artwork type                                         |
| checksum       | uuid                                            | Hash of the object                                       |
| game           | Reference ID for [Game](#game)                  | The game this artwork is associated with                 |
| height         | Integer                                         | The height of the image in pixels                        |
| image\_id      | String                                          | The ID of the image used to construct an IGDB image link |
| url            | String                                          | The website address (URL) of the item                    |
| width          | Integer                                         | The width of the image in pixels                         |

## Artwork Type

```shell
curl 'https://api.igdb.com/v4/artwork_types' \
-d 'fields checksum,created_at,name,slug,updated_at;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/artwork_types",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,created_at,name,slug,updated_at;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/artwork_types")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,created_at,name,slug,updated_at;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/artwork_types".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,created_at,name,slug,updated_at;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/artwork_types")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,created_at,name,slug,updated_at;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/artwork_types'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,created_at,name,slug,updated_at;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/artwork_types', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,created_at,name,slug,updated_at;'})
print ("response: %s" % str(response.json()))

```

Artwork Types

### Request Path

`https://api.igdb.com/v4/artwork_types`

| field       | type     | description                                               |
| ----------- | -------- | --------------------------------------------------------- |
| checksum    | uuid     | Hash of the object                                        |
| created\_at | datetime | Date this was initially added to the IGDB database        |
| name        | String   |                                                           |
| slug        | String   | A url-safe, unique, lower-case version of the name        |
| updated\_at | datetime | The last date this entry was updated in the IGDB database |

## Character

```shell
curl 'https://api.igdb.com/v4/characters' \
-d 'fields akas,character_gender,character_species,checksum,country_name,created_at,description,games,gender,mug_shot,name,slug,species,updated_at,url;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/characters",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields akas,character_gender,character_species,checksum,country_name,created_at,description,games,gender,mug_shot,name,slug,species,updated_at,url;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/characters")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields akas,character_gender,character_species,checksum,country_name,created_at,description,games,gender,mug_shot,name,slug,species,updated_at,url;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/characters".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields akas,character_gender,character_species,checksum,country_name,created_at,description,games,gender,mug_shot,name,slug,species,updated_at,url;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/characters")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields akas,character_gender,character_species,checksum,country_name,created_at,description,games,gender,mug_shot,name,slug,species,updated_at,url;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/characters'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields akas,character_gender,character_species,checksum,country_name,created_at,description,games,gender,mug_shot,name,slug,species,updated_at,url;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/characters', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields akas,character_gender,character_species,checksum,country_name,created_at,description,games,gender,mug_shot,name,slug,species,updated_at,url;'})
print ("response: %s" % str(response.json()))

```

**Deprecated Fields:**

* `gender`: DEPRECATED! Use `character_gender` instead
* `species`: DEPRECATED! Use `character_species` instead

Video game characters

### Request Path

`https://api.igdb.com/v4/characters`

| field              | type                                                        | description                                               |
| ------------------ | ----------------------------------------------------------- | --------------------------------------------------------- |
| akas               | Array of Strings                                            | Alternative names for a character                         |
| character\_gender  | Reference ID for [ Character Gender](#character-gender)     |                                                           |
| character\_species | Reference ID for [ Character Specie](#character-specie)     |                                                           |
| checksum           | uuid                                                        | Hash of the object                                        |
| country\_name      | String                                                      | A characters country of origin                            |
| created\_at        | datetime                                                    | Date this was initially added to the IGDB database        |
| description        | String                                                      | A text describing a character                             |
| games              | Array of [Game](#game) IDs                                  |                                                           |
| gender             | [Gender Enum](#character-enums)                             | DEPRECATED! Use character\_gender instead                 |
| mug\_shot          | Reference ID for [ Character Mug Shot](#character-mug-shot) | An image depicting a character                            |
| name               | String                                                      |                                                           |
| slug               | String                                                      | A url-safe, unique, lower-case version of the name        |
| species            | [Species Enum](#character-enums)                            | DEPRECATED! Use character\_species instead                |
| updated\_at        | datetime                                                    | The last date this entry was updated in the IGDB database |
| url                | String                                                      | The website address (URL) of the item                     |

### Character Enums

gender

| name   | value |
| ------ | ----- |
| Male   | 0     |
| Female | 1     |
| Other  | 2     |

species

| name    | value |
| ------- | ----- |
| Human   | 1     |
| Alien   | 2     |
| Animal  | 3     |
| Android | 4     |
| Unknown | 5     |

## Character Gender

```shell
curl 'https://api.igdb.com/v4/character_genders' \
-d 'fields checksum,created_at,name,updated_at;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/character_genders",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,created_at,name,updated_at;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/character_genders")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,created_at,name,updated_at;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/character_genders".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,created_at,name,updated_at;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/character_genders")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,created_at,name,updated_at;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/character_genders'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,created_at,name,updated_at;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/character_genders', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,created_at,name,updated_at;'})
print ("response: %s" % str(response.json()))

```

Character Genders

### Request Path

`https://api.igdb.com/v4/character_genders`

| field       | type     | description                                               |
| ----------- | -------- | --------------------------------------------------------- |
| checksum    | uuid     | Hash of the object                                        |
| created\_at | datetime | Date this was initially added to the IGDB database        |
| name        | String   |                                                           |
| updated\_at | datetime | The last date this entry was updated in the IGDB database |

## Character Mug Shot

```shell
curl 'https://api.igdb.com/v4/character_mug_shots' \
-d 'fields alpha_channel,animated,checksum,height,image_id,url,width;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/character_mug_shots",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields alpha_channel,animated,checksum,height,image_id,url,width;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/character_mug_shots")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields alpha_channel,animated,checksum,height,image_id,url,width;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/character_mug_shots".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields alpha_channel,animated,checksum,height,image_id,url,width;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/character_mug_shots")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields alpha_channel,animated,checksum,height,image_id,url,width;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/character_mug_shots'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields alpha_channel,animated,checksum,height,image_id,url,width;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/character_mug_shots', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields alpha_channel,animated,checksum,height,image_id,url,width;'})
print ("response: %s" % str(response.json()))

```

Images depicting game characters

### Request Path

`https://api.igdb.com/v4/character_mug_shots`

| field          | type    | description                                              |
| -------------- | ------- | -------------------------------------------------------- |
| alpha\_channel | boolean |                                                          |
| animated       | boolean |                                                          |
| checksum       | uuid    | Hash of the object                                       |
| height         | Integer | The height of the image in pixels                        |
| image\_id      | String  | The ID of the image used to construct an IGDB image link |
| url            | String  | The website address (URL) of the item                    |
| width          | Integer | The width of the image in pixels                         |

## Character Specie

```shell
curl 'https://api.igdb.com/v4/character_species' \
-d 'fields checksum,created_at,name,updated_at;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/character_species",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,created_at,name,updated_at;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/character_species")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,created_at,name,updated_at;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/character_species".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,created_at,name,updated_at;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/character_species")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,created_at,name,updated_at;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/character_species'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,created_at,name,updated_at;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/character_species', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,created_at,name,updated_at;'})
print ("response: %s" % str(response.json()))

```

Character Species

### Request Path

`https://api.igdb.com/v4/character_species`

| field       | type     | description                                               |
| ----------- | -------- | --------------------------------------------------------- |
| checksum    | uuid     | Hash of the object                                        |
| created\_at | datetime | Date this was initially added to the IGDB database        |
| name        | String   |                                                           |
| updated\_at | datetime | The last date this entry was updated in the IGDB database |

## Collection

```shell
curl 'https://api.igdb.com/v4/collections' \
-d 'fields as_child_relations,as_parent_relations,checksum,created_at,games,name,slug,type,updated_at,url;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/collections",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields as_child_relations,as_parent_relations,checksum,created_at,games,name,slug,type,updated_at,url;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/collections")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields as_child_relations,as_parent_relations,checksum,created_at,games,name,slug,type,updated_at,url;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/collections".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields as_child_relations,as_parent_relations,checksum,created_at,games,name,slug,type,updated_at,url;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/collections")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields as_child_relations,as_parent_relations,checksum,created_at,games,name,slug,type,updated_at,url;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/collections'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields as_child_relations,as_parent_relations,checksum,created_at,games,name,slug,type,updated_at,url;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/collections', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields as_child_relations,as_parent_relations,checksum,created_at,games,name,slug,type,updated_at,url;'})
print ("response: %s" % str(response.json()))

```

Collection, AKA Series

### Request Path

`https://api.igdb.com/v4/collections`

| field                 | type                                                      | description                                               |
| --------------------- | --------------------------------------------------------- | --------------------------------------------------------- |
| as\_child\_relations  | Array of [ Collection Relation](#collection-relation) IDs |                                                           |
| as\_parent\_relations | Array of [ Collection Relation](#collection-relation) IDs |                                                           |
| checksum              | uuid                                                      | Hash of the object                                        |
| created\_at           | datetime                                                  | Date this was initially added to the IGDB database        |
| games                 | Array of [Game](#game) IDs                                | The games that are associated with this collection        |
| name                  | String                                                    | Umbrella term for a collection of games                   |
| slug                  | String                                                    | A url-safe, unique, lower-case version of the name        |
| type                  | Reference ID for [ Collection Type](#collection-type)     | The type of collection                                    |
| updated\_at           | datetime                                                  | The last date this entry was updated in the IGDB database |
| url                   | String                                                    | The website address (URL) of the item                     |

## Collection Membership

```shell
curl 'https://api.igdb.com/v4/collection_memberships' \
-d 'fields checksum,collection,created_at,game,type,updated_at;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/collection_memberships",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,collection,created_at,game,type,updated_at;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/collection_memberships")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,collection,created_at,game,type,updated_at;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/collection_memberships".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,collection,created_at,game,type,updated_at;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/collection_memberships")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,collection,created_at,game,type,updated_at;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/collection_memberships'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,collection,created_at,game,type,updated_at;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/collection_memberships', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,collection,created_at,game,type,updated_at;'})
print ("response: %s" % str(response.json()))

```

The Collection Memberships.

### Request Path

`https://api.igdb.com/v4/collection_memberships`

| field       | type                                                                        | description                                               |
| ----------- | --------------------------------------------------------------------------- | --------------------------------------------------------- |
| checksum    | uuid                                                                        | Hash of the object                                        |
| collection  | Reference ID for [Collection](#collection)                                  | The collection that is associated with this membership    |
| created\_at | datetime                                                                    | Date this was initially added to the IGDB database        |
| game        | Reference ID for [Game](#game)                                              | The game that is associated with this membership          |
| type        | Reference ID for [ Collection Membership Type](#collection-membership-type) | The Collection Membership Type                            |
| updated\_at | datetime                                                                    | The last date this entry was updated in the IGDB database |

## Collection Membership Type

```shell
curl 'https://api.igdb.com/v4/collection_membership_types' \
-d 'fields allowed_collection_type,checksum,created_at,description,name,updated_at;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/collection_membership_types",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields allowed_collection_type,checksum,created_at,description,name,updated_at;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/collection_membership_types")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields allowed_collection_type,checksum,created_at,description,name,updated_at;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/collection_membership_types".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields allowed_collection_type,checksum,created_at,description,name,updated_at;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/collection_membership_types")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields allowed_collection_type,checksum,created_at,description,name,updated_at;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/collection_membership_types'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields allowed_collection_type,checksum,created_at,description,name,updated_at;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/collection_membership_types', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields allowed_collection_type,checksum,created_at,description,name,updated_at;'})
print ("response: %s" % str(response.json()))

```

Enums for collection membership types.

### Request Path

`https://api.igdb.com/v4/collection_membership_types`

| field                     | type                                                  | description                                               |
| ------------------------- | ----------------------------------------------------- | --------------------------------------------------------- |
| allowed\_collection\_type | Reference ID for [ Collection Type](#collection-type) | The allowed collection type                               |
| checksum                  | uuid                                                  | Hash of the object                                        |
| created\_at               | datetime                                              | Date this was initially added to the IGDB database        |
| description               | String                                                | Description of the membership type.                       |
| name                      | String                                                | The membership type name                                  |
| updated\_at               | datetime                                              | The last date this entry was updated in the IGDB database |

## Collection Relation

```shell
curl 'https://api.igdb.com/v4/collection_relations' \
-d 'fields checksum,child_collection,created_at,parent_collection,type,updated_at;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/collection_relations",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,child_collection,created_at,parent_collection,type,updated_at;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/collection_relations")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,child_collection,created_at,parent_collection,type,updated_at;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/collection_relations".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,child_collection,created_at,parent_collection,type,updated_at;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/collection_relations")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,child_collection,created_at,parent_collection,type,updated_at;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/collection_relations'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,child_collection,created_at,parent_collection,type,updated_at;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/collection_relations', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,child_collection,created_at,parent_collection,type,updated_at;'})
print ("response: %s" % str(response.json()))

```

Describes Relationship between Collections.

### Request Path

`https://api.igdb.com/v4/collection_relations`

| field              | type                                                                    | description                                               |
| ------------------ | ----------------------------------------------------------------------- | --------------------------------------------------------- |
| checksum           | uuid                                                                    | Hash of the object                                        |
| child\_collection  | Reference ID for [ Collection](#collection)                             | The child collection of this collection.                  |
| created\_at        | datetime                                                                | Date this was initially added to the IGDB database        |
| parent\_collection | Reference ID for [ Collection](#collection)                             | The parent collection of this collection.                 |
| type               | Reference ID for [ Collection Relation Type](#collection-relation-type) | The collection relationship type                          |
| updated\_at        | datetime                                                                | The last date this entry was updated in the IGDB database |

## Collection Relation Type

```shell
curl 'https://api.igdb.com/v4/collection_relation_types' \
-d 'fields allowed_child_type,allowed_parent_type,checksum,created_at,description,name,updated_at;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/collection_relation_types",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields allowed_child_type,allowed_parent_type,checksum,created_at,description,name,updated_at;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/collection_relation_types")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields allowed_child_type,allowed_parent_type,checksum,created_at,description,name,updated_at;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/collection_relation_types".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields allowed_child_type,allowed_parent_type,checksum,created_at,description,name,updated_at;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/collection_relation_types")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields allowed_child_type,allowed_parent_type,checksum,created_at,description,name,updated_at;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/collection_relation_types'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields allowed_child_type,allowed_parent_type,checksum,created_at,description,name,updated_at;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/collection_relation_types', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields allowed_child_type,allowed_parent_type,checksum,created_at,description,name,updated_at;'})
print ("response: %s" % str(response.json()))

```

Collection Relation Types

### Request Path

`https://api.igdb.com/v4/collection_relation_types`

| field                 | type                                                  | description                                               |
| --------------------- | ----------------------------------------------------- | --------------------------------------------------------- |
| allowed\_child\_type  | Reference ID for [ Collection Type](#collection-type) | The allowed child collection type                         |
| allowed\_parent\_type | Reference ID for [ Collection Type](#collection-type) | The allowed child collection type                         |
| checksum              | uuid                                                  | Hash of the object                                        |
| created\_at           | datetime                                              | Date this was initially added to the IGDB database        |
| description           | String                                                | The relationship type description                         |
| name                  | String                                                | The relationship type name                                |
| updated\_at           | datetime                                              | The last date this entry was updated in the IGDB database |

## Collection Type

```shell
curl 'https://api.igdb.com/v4/collection_types' \
-d 'fields checksum,created_at,description,name,updated_at;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/collection_types",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,created_at,description,name,updated_at;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/collection_types")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,created_at,description,name,updated_at;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/collection_types".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,created_at,description,name,updated_at;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/collection_types")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,created_at,description,name,updated_at;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/collection_types'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,created_at,description,name,updated_at;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/collection_types', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,created_at,description,name,updated_at;'})
print ("response: %s" % str(response.json()))

```

Enums for collection types.

### Request Path

`https://api.igdb.com/v4/collection_types`

| field       | type     | description                                               |
| ----------- | -------- | --------------------------------------------------------- |
| checksum    | uuid     | Hash of the object                                        |
| created\_at | datetime | Date this was initially added to the IGDB database        |
| description | String   | Description of the collection type.                       |
| name        | String   | The name of the collection type                           |
| updated\_at | datetime | The last date this entry was updated in the IGDB database |

## Company

```shell
curl 'https://api.igdb.com/v4/companies' \
-d 'fields change_date,change_date_category,change_date_format,changed_company_id,checksum,company_size,company_type_histories,country,created_at,description,developed,logo,name,parent,published,slug,start_date,start_date_category,start_date_format,status,updated_at,url,websites;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/companies",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields change_date,change_date_category,change_date_format,changed_company_id,checksum,company_size,company_type_histories,country,created_at,description,developed,logo,name,parent,published,slug,start_date,start_date_category,start_date_format,status,updated_at,url,websites;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/companies")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields change_date,change_date_category,change_date_format,changed_company_id,checksum,company_size,company_type_histories,country,created_at,description,developed,logo,name,parent,published,slug,start_date,start_date_category,start_date_format,status,updated_at,url,websites;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/companies".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields change_date,change_date_category,change_date_format,changed_company_id,checksum,company_size,company_type_histories,country,created_at,description,developed,logo,name,parent,published,slug,start_date,start_date_category,start_date_format,status,updated_at,url,websites;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/companies")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields change_date,change_date_category,change_date_format,changed_company_id,checksum,company_size,company_type_histories,country,created_at,description,developed,logo,name,parent,published,slug,start_date,start_date_category,start_date_format,status,updated_at,url,websites;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/companies'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields change_date,change_date_category,change_date_format,changed_company_id,checksum,company_size,company_type_histories,country,created_at,description,developed,logo,name,parent,published,slug,start_date,start_date_category,start_date_format,status,updated_at,url,websites;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/companies', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields change_date,change_date_category,change_date_format,changed_company_id,checksum,company_size,company_type_histories,country,created_at,description,developed,logo,name,parent,published,slug,start_date,start_date_category,start_date_format,status,updated_at,url,websites;'})
print ("response: %s" % str(response.json()))

```

**Deprecated Fields:**

* `change_date_category`: DEPRECATED! Use `change_date_format` instead
* `start_date_category`: DEPRECATED! Use `start_date_format` instead

Video game companies. Both publishers & developers

### Request Path

`https://api.igdb.com/v4/companies`

| field                    | type                                                        | description                                                              |
| ------------------------ | ----------------------------------------------------------- | ------------------------------------------------------------------------ |
| change\_date             | Unix Time Stamp                                             | The data when a company got a new ID                                     |
| change\_date\_category   | [Change Date Category Enum](#company-enums)                 | DEPRECATED! Use change\_date\_format instead                             |
| change\_date\_format     | Reference ID for [ Date Format](#date-format)               | The format of the change date                                            |
| changed\_company\_id     | Reference ID for [ Company](#company)                       | The new ID for a company that has gone through a merger or restructuring |
| checksum                 | uuid                                                        | Hash of the object                                                       |
| company\_size            | Reference ID for [ Company Size](#company-size)             | The size of the company                                                  |
| company\_type\_histories | Array of [ Company Type History](#company-type-history) IDs | The history of company types                                             |
| country                  | Integer                                                     | ISO 3166-1 country code                                                  |
| created\_at              | datetime                                                    | Date this was initially added to the IGDB database                       |
| description              | String                                                      | A free text description of a company                                     |
| developed                | Array of [ Game](#game) IDs                                 | An array of games that a company has developed                           |
| logo                     | Reference ID for [ Company Logo](#company-logo)             | The company’s logo                                                       |
| name                     | String                                                      |                                                                          |
| parent                   | Reference ID for [ Company](#company)                       | A company with a controlling interest in a specific company              |
| published                | Array of [ Game](#game) IDs                                 | An array of games that a company has published                           |
| slug                     | String                                                      | A url-safe, unique, lower-case version of the name                       |
| start\_date              | Unix Time Stamp                                             | The date a company was founded                                           |
| start\_date\_category    | [Start Date Category Enum](#company-enums)                  | DEPRECATED! Use start\_date\_format instead                              |
| start\_date\_format      | Reference ID for [ Date Format](#date-format)               | The format of the start date                                             |
| status                   | Reference ID for [ Company Status](#company-status)         | The status of the company                                                |
| updated\_at              | datetime                                                    | The last date this entry was updated in the IGDB database                |
| url                      | String                                                      | The website address (URL) of the item                                    |
| websites                 | Array of [ Company Website](#company-website) IDs           | The companies official websites                                          |

### Company Enums

change\_date\_category

| name       | value |
| ---------- | ----- |
| YYYYMMMMDD | 0     |
| YYYYMMMM   | 1     |
| YYYY       | 2     |
| YYYYQ1     | 3     |
| YYYYQ2     | 4     |
| YYYYQ3     | 5     |
| YYYYQ4     | 6     |
| TBD        | 7     |

start\_date\_category

| name       | value |
| ---------- | ----- |
| YYYYMMMMDD | 0     |
| YYYYMMMM   | 1     |
| YYYY       | 2     |
| YYYYQ1     | 3     |
| YYYYQ2     | 4     |
| YYYYQ3     | 5     |
| YYYYQ4     | 6     |
| TBD        | 7     |

## Company Logo

```shell
curl 'https://api.igdb.com/v4/company_logos' \
-d 'fields alpha_channel,animated,checksum,height,image_id,url,width;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/company_logos",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields alpha_channel,animated,checksum,height,image_id,url,width;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/company_logos")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields alpha_channel,animated,checksum,height,image_id,url,width;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/company_logos".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields alpha_channel,animated,checksum,height,image_id,url,width;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/company_logos")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields alpha_channel,animated,checksum,height,image_id,url,width;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/company_logos'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields alpha_channel,animated,checksum,height,image_id,url,width;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/company_logos', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields alpha_channel,animated,checksum,height,image_id,url,width;'})
print ("response: %s" % str(response.json()))

```

The logos of developers and publishers

### Request Path

`https://api.igdb.com/v4/company_logos`

| field          | type    | description                                              |
| -------------- | ------- | -------------------------------------------------------- |
| alpha\_channel | boolean |                                                          |
| animated       | boolean |                                                          |
| checksum       | uuid    | Hash of the object                                       |
| height         | Integer | The height of the image in pixels                        |
| image\_id      | String  | The ID of the image used to construct an IGDB image link |
| url            | String  | The website address (URL) of the item                    |
| width          | Integer | The width of the image in pixels                         |

## Company Size

```shell
curl 'https://api.igdb.com/v4/company_sizes' \
-d 'fields checksum,created_at,name,updated_at;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/company_sizes",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,created_at,name,updated_at;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/company_sizes")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,created_at,name,updated_at;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/company_sizes".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,created_at,name,updated_at;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/company_sizes")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,created_at,name,updated_at;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/company_sizes'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,created_at,name,updated_at;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/company_sizes', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,created_at,name,updated_at;'})
print ("response: %s" % str(response.json()))

```

Company Size

### Request Path

`https://api.igdb.com/v4/company_sizes`

| field       | type     | description                                               |
| ----------- | -------- | --------------------------------------------------------- |
| checksum    | uuid     | Hash of the object                                        |
| created\_at | datetime | Date this was initially added to the IGDB database        |
| name        | String   |                                                           |
| updated\_at | datetime | The last date this entry was updated in the IGDB database |

## Company Status

```shell
curl 'https://api.igdb.com/v4/company_statuses' \
-d 'fields checksum,created_at,name,updated_at;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/company_statuses",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,created_at,name,updated_at;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/company_statuses")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,created_at,name,updated_at;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/company_statuses".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,created_at,name,updated_at;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/company_statuses")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,created_at,name,updated_at;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/company_statuses'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,created_at,name,updated_at;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/company_statuses', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,created_at,name,updated_at;'})
print ("response: %s" % str(response.json()))

```

Company Status

### Request Path

`https://api.igdb.com/v4/company_statuses`

| field       | type     | description                                               |
| ----------- | -------- | --------------------------------------------------------- |
| checksum    | uuid     | Hash of the object                                        |
| created\_at | datetime | Date this was initially added to the IGDB database        |
| name        | String   |                                                           |
| updated\_at | datetime | The last date this entry was updated in the IGDB database |

## Company Type

```shell
curl 'https://api.igdb.com/v4/company_types' \
-d 'fields checksum,created_at,name,updated_at;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/company_types",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,created_at,name,updated_at;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/company_types")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,created_at,name,updated_at;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/company_types".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,created_at,name,updated_at;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/company_types")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,created_at,name,updated_at;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/company_types'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,created_at,name,updated_at;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/company_types', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,created_at,name,updated_at;'})
print ("response: %s" % str(response.json()))

```

Company Type

### Request Path

`https://api.igdb.com/v4/company_types`

| field       | type     | description                                               |
| ----------- | -------- | --------------------------------------------------------- |
| checksum    | uuid     | Hash of the object                                        |
| created\_at | datetime | Date this was initially added to the IGDB database        |
| name        | String   |                                                           |
| updated\_at | datetime | The last date this entry was updated in the IGDB database |

## Company Type History

```shell
curl 'https://api.igdb.com/v4/company_type_histories' \
-d 'fields checksum,company,company_type,created_at,parent_company,updated_at;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/company_type_histories",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,company,company_type,created_at,parent_company,updated_at;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/company_type_histories")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,company,company_type,created_at,parent_company,updated_at;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/company_type_histories".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,company,company_type,created_at,parent_company,updated_at;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/company_type_histories")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,company,company_type,created_at,parent_company,updated_at;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/company_type_histories'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,company,company_type,created_at,parent_company,updated_at;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/company_type_histories', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,company,company_type,created_at,parent_company,updated_at;'})
print ("response: %s" % str(response.json()))

```

Company type history

### Request Path

`https://api.igdb.com/v4/company_type_histories`

| field           | type                                            | description                                               |
| --------------- | ----------------------------------------------- | --------------------------------------------------------- |
| checksum        | uuid                                            | Hash of the object                                        |
| company         | Reference ID for [ Company](#company)           | The company                                               |
| company\_type   | Reference ID for [ Company Type](#company-type) | The company type                                          |
| created\_at     | datetime                                        | Date this was initially added to the IGDB database        |
| parent\_company | Reference ID for [ Company](#company)           | The parent company                                        |
| updated\_at     | datetime                                        | The last date this entry was updated in the IGDB database |

## Company Website

```shell
curl 'https://api.igdb.com/v4/company_websites' \
-d 'fields category,checksum,trusted,type,url;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/company_websites",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields category,checksum,trusted,type,url;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/company_websites")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields category,checksum,trusted,type,url;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/company_websites".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields category,checksum,trusted,type,url;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/company_websites")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields category,checksum,trusted,type,url;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/company_websites'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields category,checksum,trusted,type,url;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/company_websites', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields category,checksum,trusted,type,url;'})
print ("response: %s" % str(response.json()))

```

**Deprecated Fields:**

* `category`: DEPRECATED! Use `type` instead

Company Website

### Request Path

`https://api.igdb.com/v4/company_websites`

| field    | type                                            | description                                  |
| -------- | ----------------------------------------------- | -------------------------------------------- |
| category | [Category Enum](#company-website-enums)         | DEPRECATED! Use type instead                 |
| checksum | uuid                                            | Hash of the object                           |
| trusted  | boolean                                         |                                              |
| type     | Reference ID for [ Website Type](#website-type) | The website type associated with the website |
| url      | String                                          | The website address (URL) of the item        |

### Company Website Enums

category

| name      | value |
| --------- | ----- |
| official  | 1     |
| wikia     | 2     |
| wikipedia | 3     |
| facebook  | 4     |
| twitter   | 5     |
| twitch    | 6     |
| instagram | 8     |
| youtube   | 9     |
| iphone    | 10    |
| ipad      | 11    |
| android   | 12    |
| steam     | 13    |
| reddit    | 14    |
| itch      | 15    |
| epicgames | 16    |
| gog       | 17    |
| discord   | 18    |
| bluesky   | 19    |

## Cover

```shell
curl 'https://api.igdb.com/v4/covers' \
-d 'fields alpha_channel,animated,checksum,game,game_localization,height,image_id,url,width;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/covers",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields alpha_channel,animated,checksum,game,game_localization,height,image_id,url,width;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/covers")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields alpha_channel,animated,checksum,game,game_localization,height,image_id,url,width;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/covers".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields alpha_channel,animated,checksum,game,game_localization,height,image_id,url,width;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/covers")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields alpha_channel,animated,checksum,game,game_localization,height,image_id,url,width;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/covers'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields alpha_channel,animated,checksum,game,game_localization,height,image_id,url,width;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/covers', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields alpha_channel,animated,checksum,game,game_localization,height,image_id,url,width;'})
print ("response: %s" % str(response.json()))

```

The cover art of games

### Request Path

`https://api.igdb.com/v4/covers`

| field              | type                                                     | description                                                                                                                                               |
| ------------------ | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| alpha\_channel     | boolean                                                  |                                                                                                                                                           |
| animated           | boolean                                                  |                                                                                                                                                           |
| checksum           | uuid                                                     | Hash of the object                                                                                                                                        |
| game               | Reference ID for [Game](#game)                           | The game this cover is associated with. If it is empty then this cover belongs to a game\_localization, which can be found under game\_localization field |
| game\_localization | Reference ID for [Game Localization](#game-localization) | The game localization this cover might be associated with                                                                                                 |
| height             | Integer                                                  | The height of the image in pixels                                                                                                                         |
| image\_id          | String                                                   | The ID of the image used to construct an IGDB image link                                                                                                  |
| url                | String                                                   | The website address (URL) of the item                                                                                                                     |
| width              | Integer                                                  | The width of the image in pixels                                                                                                                          |

## Date Format

```shell
curl 'https://api.igdb.com/v4/date_formats' \
-d 'fields checksum,created_at,format,updated_at;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/date_formats",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,created_at,format,updated_at;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/date_formats")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,created_at,format,updated_at;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/date_formats".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,created_at,format,updated_at;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/date_formats")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,created_at,format,updated_at;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/date_formats'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,created_at,format,updated_at;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/date_formats', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,created_at,format,updated_at;'})
print ("response: %s" % str(response.json()))

```

The Date Format

### Request Path

`https://api.igdb.com/v4/date_formats`

| field       | type     | description                                               |
| ----------- | -------- | --------------------------------------------------------- |
| checksum    | uuid     | Hash of the object                                        |
| created\_at | datetime | Date this was initially added to the IGDB database        |
| format      | String   |                                                           |
| updated\_at | datetime | The last date this entry was updated in the IGDB database |

## Entity Type

```shell
curl 'https://api.igdb.com/v4/entity_types' \
-d 'fields checksum,created_at,description,name,updated_at;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/entity_types",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,created_at,description,name,updated_at;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/entity_types")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,created_at,description,name,updated_at;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/entity_types".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,created_at,description,name,updated_at;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/entity_types")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,created_at,description,name,updated_at;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/entity_types'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,created_at,description,name,updated_at;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/entity_types', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,created_at,description,name,updated_at;'})
print ("response: %s" % str(response.json()))

```

EntityTypes are the subjects of Reports.

### Request Path

`https://api.igdb.com/v4/entity_types`

| field       | type     | description                                               |
| ----------- | -------- | --------------------------------------------------------- |
| checksum    | uuid     | Hash of the object                                        |
| created\_at | datetime | Date this was initially added to the IGDB database        |
| description | String   |                                                           |
| name        | String   |                                                           |
| updated\_at | datetime | The last date this entry was updated in the IGDB database |

## Event

```shell
curl 'https://api.igdb.com/v4/events' \
-d 'fields checksum,created_at,description,end_time,event_logo,event_networks,games,live_stream_url,name,slug,start_time,time_zone,updated_at,videos;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/events",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,created_at,description,end_time,event_logo,event_networks,games,live_stream_url,name,slug,start_time,time_zone,updated_at,videos;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/events")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,created_at,description,end_time,event_logo,event_networks,games,live_stream_url,name,slug,start_time,time_zone,updated_at,videos;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/events".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,created_at,description,end_time,event_logo,event_networks,games,live_stream_url,name,slug,start_time,time_zone,updated_at,videos;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/events")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,created_at,description,end_time,event_logo,event_networks,games,live_stream_url,name,slug,start_time,time_zone,updated_at,videos;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/events'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,created_at,description,end_time,event_logo,event_networks,games,live_stream_url,name,slug,start_time,time_zone,updated_at,videos;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/events', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,created_at,description,end_time,event_logo,event_networks,games,live_stream_url,name,slug,start_time,time_zone,updated_at,videos;'})
print ("response: %s" % str(response.json()))

```

Gaming event like GamesCom, Tokyo Game Show, PAX or GSL

### Request Path

`https://api.igdb.com/v4/events`

| field             | type                                          | description                                               |
| ----------------- | --------------------------------------------- | --------------------------------------------------------- |
| checksum          | uuid                                          | Hash of the object                                        |
| created\_at       | datetime                                      | Date this was initially added to the IGDB database        |
| description       | String                                        | The description of the event                              |
| end\_time         | datetime                                      | End time of the event in UTC                              |
| event\_logo       | Reference ID for [ Event Logo](#event-logo)   | Logo of the event.                                        |
| event\_networks   | Array of [ Event Network](#event-network) IDs | Urls associated with the event                            |
| games             | Array of [ Game](#game) IDs                   | Games featured in the event                               |
| live\_stream\_url | String                                        | URL to the livestream of the event.                       |
| name              | String                                        | The name of the event                                     |
| slug              | String                                        | A url-safe, unique, lower-case version of the name        |
| start\_time       | datetime                                      | Start time of the event in UTC                            |
| time\_zone        | String                                        | Timezone the event is in.                                 |
| updated\_at       | datetime                                      | The last date this entry was updated in the IGDB database |
| videos            | Array of [ Game Video](#game-video) IDs       | Trailers featured in the event                            |

## Event Logo

```shell
curl 'https://api.igdb.com/v4/event_logos' \
-d 'fields alpha_channel,animated,checksum,created_at,event,height,image_id,updated_at,url,width;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/event_logos",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields alpha_channel,animated,checksum,created_at,event,height,image_id,updated_at,url,width;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/event_logos")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields alpha_channel,animated,checksum,created_at,event,height,image_id,updated_at,url,width;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/event_logos".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields alpha_channel,animated,checksum,created_at,event,height,image_id,updated_at,url,width;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/event_logos")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields alpha_channel,animated,checksum,created_at,event,height,image_id,updated_at,url,width;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/event_logos'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields alpha_channel,animated,checksum,created_at,event,height,image_id,updated_at,url,width;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/event_logos', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields alpha_channel,animated,checksum,created_at,event,height,image_id,updated_at,url,width;'})
print ("response: %s" % str(response.json()))

```

Logo for the event

### Request Path

`https://api.igdb.com/v4/event_logos`

| field          | type                             | description                                               |
| -------------- | -------------------------------- | --------------------------------------------------------- |
| alpha\_channel | boolean                          |                                                           |
| animated       | boolean                          |                                                           |
| checksum       | uuid                             | Hash of the object                                        |
| created\_at    | datetime                         | Date this was initially added to the IGDB database        |
| event          | Reference ID for [Event](#event) | The event associated with this logo.                      |
| height         | Integer                          | The height of the image in pixels                         |
| image\_id      | String                           | The ID of the image used to construct an IGDB image link  |
| updated\_at    | datetime                         | The last date this entry was updated in the IGDB database |
| url            | String                           | The website address (URL) of the item                     |
| width          | Integer                          | The width of the image in pixels                          |

## Event Network

```shell
curl 'https://api.igdb.com/v4/event_networks' \
-d 'fields checksum,created_at,event,network_type,updated_at,url;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/event_networks",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,created_at,event,network_type,updated_at,url;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/event_networks")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,created_at,event,network_type,updated_at,url;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/event_networks".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,created_at,event,network_type,updated_at,url;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/event_networks")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,created_at,event,network_type,updated_at,url;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/event_networks'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,created_at,event,network_type,updated_at,url;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/event_networks', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,created_at,event,network_type,updated_at,url;'})
print ("response: %s" % str(response.json()))

```

Urls related to the event like twitter, facebook and youtube

### Request Path

`https://api.igdb.com/v4/event_networks`

| field         | type                                            | description                                               |
| ------------- | ----------------------------------------------- | --------------------------------------------------------- |
| checksum      | uuid                                            | Hash of the object                                        |
| created\_at   | datetime                                        | Date this was initially added to the IGDB database        |
| event         | Reference ID for [Event](#event)                | The event associated with this URL.                       |
| network\_type | Reference ID for [ Network Type](#network-type) | Network type                                              |
| updated\_at   | datetime                                        | The last date this entry was updated in the IGDB database |
| url           | String                                          | The website address (URL) of the item                     |

## External Game

```shell
curl 'https://api.igdb.com/v4/external_games' \
-d 'fields category,checksum,countries,created_at,external_game_source,game,game_release_format,media,name,platform,uid,updated_at,url,year;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/external_games",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields category,checksum,countries,created_at,external_game_source,game,game_release_format,media,name,platform,uid,updated_at,url,year;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/external_games")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields category,checksum,countries,created_at,external_game_source,game,game_release_format,media,name,platform,uid,updated_at,url,year;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/external_games".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields category,checksum,countries,created_at,external_game_source,game,game_release_format,media,name,platform,uid,updated_at,url,year;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/external_games")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields category,checksum,countries,created_at,external_game_source,game,game_release_format,media,name,platform,uid,updated_at,url,year;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/external_games'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields category,checksum,countries,created_at,external_game_source,game,game_release_format,media,name,platform,uid,updated_at,url,year;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/external_games', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields category,checksum,countries,created_at,external_game_source,game,game_release_format,media,name,platform,uid,updated_at,url,year;'})
print ("response: %s" % str(response.json()))

```

**Deprecated Fields:**

* `category`: DEPRECATED! Use `external_game_source` instead
* `media`: DEPRECATED! Use `game_release_format` instead

Game IDs on other services

### Request Path

`https://api.igdb.com/v4/external_games`

| field                  | type                                                            | description                                               |
| ---------------------- | --------------------------------------------------------------- | --------------------------------------------------------- |
| category               | [Category Enum](#external-game-enums)                           | DEPRECATED! Use external\_game\_source instead            |
| checksum               | uuid                                                            | Hash of the object                                        |
| countries              | Array of Integers                                               | The ISO country code of the external game product.        |
| created\_at            | datetime                                                        | Date this was initially added to the IGDB database        |
| external\_game\_source | Reference ID for [ External Game Source](#external-game-source) | The source of the external game.                          |
| game                   | Reference ID for [Game](#game)                                  | The IGDB ID of the game                                   |
| game\_release\_format  | Reference ID for [ Game Release Format](#game-release-format)   | The release format of the external game.                  |
| media                  | [Media Enum](#external-game-enums)                              | DEPRECATED! Use game\_release\_format instead             |
| name                   | String                                                          | The name of the game according to the other service       |
| platform               | Reference ID for [Platform](#platform)                          | The platform of the external game product.                |
| uid                    | String                                                          | The other services ID for this game                       |
| updated\_at            | datetime                                                        | The last date this entry was updated in the IGDB database |
| url                    | String                                                          | The website address (URL) of the item                     |
| year                   | Integer                                                         | The year in full (2018)                                   |

### External Game Enums

category

| name                              | value |
| --------------------------------- | ----- |
| steam                             | 1     |
| gog                               | 5     |
| youtube                           | 10    |
| microsoft                         | 11    |
| apple                             | 13    |
| twitch                            | 14    |
| android                           | 15    |
| amazon\_asin                      | 20    |
| amazon\_luna                      | 22    |
| amazon\_adg                       | 23    |
| epic\_game\_store                 | 26    |
| oculus                            | 28    |
| utomik                            | 29    |
| itch\_io                          | 30    |
| xbox\_marketplace                 | 31    |
| kartridge                         | 32    |
| playstation\_store\_us            | 36    |
| focus\_entertainment              | 37    |
| xbox\_game\_pass\_ultimate\_cloud | 54    |
| gamejolt                          | 55    |

media

| name     | value |
| -------- | ----- |
| digital  | 1     |
| physical | 2     |

## External Game Source

```shell
curl 'https://api.igdb.com/v4/external_game_sources' \
-d 'fields checksum,created_at,name,updated_at;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/external_game_sources",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,created_at,name,updated_at;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/external_game_sources")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,created_at,name,updated_at;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/external_game_sources".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,created_at,name,updated_at;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/external_game_sources")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,created_at,name,updated_at;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/external_game_sources'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,created_at,name,updated_at;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/external_game_sources', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,created_at,name,updated_at;'})
print ("response: %s" % str(response.json()))

```

Sources for the external games

### Request Path

`https://api.igdb.com/v4/external_game_sources`

| field       | type     | description                                               |
| ----------- | -------- | --------------------------------------------------------- |
| checksum    | uuid     | Hash of the object                                        |
| created\_at | datetime | Date this was initially added to the IGDB database        |
| name        | String   |                                                           |
| updated\_at | datetime | The last date this entry was updated in the IGDB database |

## Franchise

```shell
curl 'https://api.igdb.com/v4/franchises' \
-d 'fields checksum,created_at,games,name,slug,updated_at,url;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/franchises",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,created_at,games,name,slug,updated_at,url;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/franchises")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,created_at,games,name,slug,updated_at,url;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/franchises".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,created_at,games,name,slug,updated_at,url;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/franchises")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,created_at,games,name,slug,updated_at,url;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/franchises'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,created_at,games,name,slug,updated_at,url;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/franchises', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,created_at,games,name,slug,updated_at,url;'})
print ("response: %s" % str(response.json()))

```

A list of video game franchises such as Star Wars.

### Request Path

`https://api.igdb.com/v4/franchises`

| field       | type                       | description                                               |
| ----------- | -------------------------- | --------------------------------------------------------- |
| checksum    | uuid                       | Hash of the object                                        |
| created\_at | datetime                   | Date this was initially added to the IGDB database        |
| games       | Array of [Game](#game) IDs | The games that are associated with this franchise         |
| name        | String                     | The name of the franchise                                 |
| slug        | String                     | A url-safe, unique, lower-case version of the name        |
| updated\_at | datetime                   | The last date this entry was updated in the IGDB database |
| url         | String                     | The website address (URL) of the item                     |

## Game

```shell
curl 'https://api.igdb.com/v4/games' \
-d 'fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,collections,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes,game_status,game_type,genres,hypes,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/games",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,collections,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes,game_status,game_type,genres,hypes,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/games")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,collections,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes,game_status,game_type,genres,hypes,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/games".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,collections,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes,game_status,game_type,genres,hypes,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/games")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,collections,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes,game_status,game_type,genres,hypes,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/games'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,collections,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes,game_status,game_type,genres,hypes,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/games', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,collections,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes,game_status,game_type,genres,hypes,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;'})
print ("response: %s" % str(response.json()))

```

**Deprecated Fields:**

* `category`: DEPRECATED! Use `game_type` instead
* `collection`: DEPRECATED! Use `collections` instead
* `follows`: DEPRECATED! - To be removed
* `status`: DEPRECATED! Use `game_status` instead

Video Games!

### Request Path

`https://api.igdb.com/v4/games`

| field                     | type                                                   | description                                                                                                  |
| ------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| age\_ratings              | Array of [ Age Rating](#age-rating) IDs                | The PEGI rating                                                                                              |
| aggregated\_rating        | Double                                                 | Rating based on external critic scores                                                                       |
| aggregated\_rating\_count | Integer                                                | Number of external critic scores                                                                             |
| alternative\_names        | Array of [Alternative Name](#alternative-name) IDs     | Alternative names for this game                                                                              |
| artworks                  | Array of [Artwork](#artwork) IDs                       | Artworks of this game                                                                                        |
| bundles                   | Array of [ Game](#game) IDs                            | The bundles this game is a part of                                                                           |
| category                  | [Category Enum](#game-enums)                           | DEPRECATED! Use game\_type instead                                                                           |
| checksum                  | uuid                                                   | Hash of the object                                                                                           |
| collection                | Reference ID for [Collection](#collection)             | DEPRECATED! Use collections instead                                                                          |
| collections               | Array of [ Collection](#collection) IDs                | The collections that this game is in.                                                                        |
| cover                     | Reference ID for [Cover](#cover)                       | The cover of this game                                                                                       |
| created\_at               | datetime                                               | Date this was initially added to the IGDB database                                                           |
| dlcs                      | Array of [ Game](#game) IDs                            | DLCs for this game                                                                                           |
| expanded\_games           | Array of [ Game](#game) IDs                            | Expanded games of this game                                                                                  |
| expansions                | Array of [ Game](#game) IDs                            | Expansions of this game                                                                                      |
| external\_games           | Array of [External Game](#external-game) IDs           | External IDs this game has on other services                                                                 |
| first\_release\_date      | Unix Time Stamp                                        | The first release date for this game                                                                         |
| follows                   | Integer                                                | DEPRECATED! - To be removed                                                                                  |
| forks                     | Array of [ Game](#game) IDs                            | Forks of this game                                                                                           |
| franchise                 | Reference ID for [Franchise](#franchise)               | The main franchise                                                                                           |
| franchises                | Array of [Franchise](#franchise) IDs                   | Other franchises the game belongs to                                                                         |
| game\_engines             | Array of [Game Engine](#game-engine) IDs               | The game engine used in this game                                                                            |
| game\_localizations       | Array of [Game Localization](#game-localization) IDs   | Supported game localizations for this game. A region can have at most one game localization for a given game |
| game\_modes               | Array of [Game Mode](#game-mode) IDs                   | Modes of gameplay                                                                                            |
| game\_status              | Reference ID for [ Game Status](#game-status)          | The status of the games release                                                                              |
| game\_type                | Reference ID for [ Game Type](#game-type)              | The type of game                                                                                             |
| genres                    | Array of [Genre](#genre) IDs                           | Genres of the game                                                                                           |
| hypes                     | Integer                                                | Number of follows a game gets before release                                                                 |
| involved\_companies       | Array of [Involved Company](#involved-company) IDs     | Companies who developed this game                                                                            |
| keywords                  | Array of [Keyword](#keyword) IDs                       | Associated keywords                                                                                          |
| language\_supports        | Array of [Language Support](#language-support) IDs     | Supported Languages for this game                                                                            |
| multiplayer\_modes        | Array of [Multiplayer Mode](#multiplayer-mode) IDs     | Multiplayer modes for this game                                                                              |
| name                      | String                                                 |                                                                                                              |
| parent\_game              | Reference ID for [ Game](#game)                        | If a DLC, expansion or part of a bundle, this is the main game or bundle                                     |
| platforms                 | Array of [Platform](#platform) IDs                     | Platforms this game was released on                                                                          |
| player\_perspectives      | Array of [Player Perspective](#player-perspective) IDs | The main perspective of the player                                                                           |
| ports                     | Array of [ Game](#game) IDs                            | Ports of this game                                                                                           |
| rating                    | Double                                                 | Average IGDB user rating                                                                                     |
| rating\_count             | Integer                                                | Total number of IGDB user ratings                                                                            |
| release\_dates            | Array of [Release Date](#release-date) IDs             | Release dates of this game                                                                                   |
| remakes                   | Array of [ Game](#game) IDs                            | Remakes of this game                                                                                         |
| remasters                 | Array of [ Game](#game) IDs                            | Remasters of this game                                                                                       |
| screenshots               | Array of [Screenshot](#screenshot) IDs                 | Screenshots of this game                                                                                     |
| similar\_games            | Array of [ Game](#game) IDs                            | Similar games                                                                                                |
| slug                      | String                                                 | A url-safe, unique, lower-case version of the name                                                           |
| standalone\_expansions    | Array of [ Game](#game) IDs                            | Standalone expansions of this game                                                                           |
| status                    | [Status Enum](#game-enums)                             | DEPRECATED! Use game\_status instead                                                                         |
| storyline                 | String                                                 | A short description of a games story                                                                         |
| summary                   | String                                                 | A description of the game                                                                                    |
| tags                      | Array of [Tag Numbers](#tag-numbers)                   | Related entities in the IGDB API                                                                             |
| themes                    | Array of [Theme](#theme) IDs                           | Themes of the game                                                                                           |
| total\_rating             | Double                                                 | Average rating based on both IGDB user and external critic scores                                            |
| total\_rating\_count      | Integer                                                | Total number of user and external critic scores                                                              |
| updated\_at               | datetime                                               | The last date this entry was updated in the IGDB database                                                    |
| url                       | String                                                 | The website address (URL) of the item                                                                        |
| version\_parent           | Reference ID for [ Game](#game)                        | If a version, this is the main game                                                                          |
| version\_title            | String                                                 | Title of this version (i.e Gold edition)                                                                     |
| videos                    | Array of [ Game Video](#game-video) IDs                | Videos of this game                                                                                          |
| websites                  | Array of [ Website](#website) IDs                      | Websites associated with this game                                                                           |

### Game Enums

category

| name                  | value |
| --------------------- | ----- |
| main\_game            | 0     |
| dlc\_addon            | 1     |
| expansion             | 2     |
| bundle                | 3     |
| standalone\_expansion | 4     |
| mod                   | 5     |
| episode               | 6     |
| season                | 7     |
| remake                | 8     |
| remaster              | 9     |
| expanded\_game        | 10    |
| port                  | 11    |
| fork                  | 12    |
| pack                  | 13    |
| update                | 14    |

status

| name          | value |
| ------------- | ----- |
| released      | 0     |
| alpha         | 2     |
| beta          | 3     |
| early\_access | 4     |
| offline       | 5     |
| cancelled     | 6     |
| rumored       | 7     |
| delisted      | 8     |

## Game Engine

```shell
curl 'https://api.igdb.com/v4/game_engines' \
-d 'fields checksum,companies,created_at,description,logo,name,platforms,slug,updated_at,url;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/game_engines",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,companies,created_at,description,logo,name,platforms,slug,updated_at,url;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/game_engines")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,companies,created_at,description,logo,name,platforms,slug,updated_at,url;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/game_engines".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,companies,created_at,description,logo,name,platforms,slug,updated_at,url;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/game_engines")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,companies,created_at,description,logo,name,platforms,slug,updated_at,url;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/game_engines'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,companies,created_at,description,logo,name,platforms,slug,updated_at,url;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/game_engines', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,companies,created_at,description,logo,name,platforms,slug,updated_at,url;'})
print ("response: %s" % str(response.json()))

```

Video game engines such as unreal engine.

### Request Path

`https://api.igdb.com/v4/game_engines`

| field       | type                                                    | description                                               |
| ----------- | ------------------------------------------------------- | --------------------------------------------------------- |
| checksum    | uuid                                                    | Hash of the object                                        |
| companies   | Array of [Company](#company) IDs                        | Companies who used this game engine                       |
| created\_at | datetime                                                | Date this was initially added to the IGDB database        |
| description | String                                                  | Description of the game engine                            |
| logo        | Reference ID for [ Game Engine Logo](#game-engine-logo) | Logo of the game engine                                   |
| name        | String                                                  | Name of the game engine                                   |
| platforms   | Array of [Platform](#platform) IDs                      | Platforms this game engine was deployed on                |
| slug        | String                                                  | A url-safe, unique, lower-case version of the name        |
| updated\_at | datetime                                                | The last date this entry was updated in the IGDB database |
| url         | String                                                  | The website address (URL) of the item                     |

## Game Engine Logo

```shell
curl 'https://api.igdb.com/v4/game_engine_logos' \
-d 'fields alpha_channel,animated,checksum,height,image_id,url,width;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/game_engine_logos",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields alpha_channel,animated,checksum,height,image_id,url,width;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/game_engine_logos")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields alpha_channel,animated,checksum,height,image_id,url,width;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/game_engine_logos".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields alpha_channel,animated,checksum,height,image_id,url,width;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/game_engine_logos")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields alpha_channel,animated,checksum,height,image_id,url,width;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/game_engine_logos'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields alpha_channel,animated,checksum,height,image_id,url,width;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/game_engine_logos', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields alpha_channel,animated,checksum,height,image_id,url,width;'})
print ("response: %s" % str(response.json()))

```

The logos of game engines

### Request Path

`https://api.igdb.com/v4/game_engine_logos`

| field          | type    | description                                              |
| -------------- | ------- | -------------------------------------------------------- |
| alpha\_channel | boolean |                                                          |
| animated       | boolean |                                                          |
| checksum       | uuid    | Hash of the object                                       |
| height         | Integer | The height of the image in pixels                        |
| image\_id      | String  | The ID of the image used to construct an IGDB image link |
| url            | String  | The website address (URL) of the item                    |
| width          | Integer | The width of the image in pixels                         |

## Game Localization

```shell
curl 'https://api.igdb.com/v4/game_localizations' \
-d 'fields checksum,cover,created_at,game,name,region,updated_at;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/game_localizations",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,cover,created_at,game,name,region,updated_at;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/game_localizations")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,cover,created_at,game,name,region,updated_at;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/game_localizations".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,cover,created_at,game,name,region,updated_at;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/game_localizations")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,cover,created_at,game,name,region,updated_at;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/game_localizations'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,cover,created_at,game,name,region,updated_at;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/game_localizations', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,cover,created_at,game,name,region,updated_at;'})
print ("response: %s" % str(response.json()))

```

Game localization for a game

### Request Path

`https://api.igdb.com/v4/game_localizations`

| field       | type                                | description                                               |
| ----------- | ----------------------------------- | --------------------------------------------------------- |
| checksum    | uuid                                | Hash of the object                                        |
| cover       | Reference ID for [Cover](#cover)    | The cover of this game localization                       |
| created\_at | datetime                            | Date this was initially added to the IGDB database        |
| game        | Reference ID for [ Game](#game)     | The Game the localization belongs to                      |
| name        | String                              |                                                           |
| region      | Reference ID for [ Region](#region) | The Region of the localization                            |
| updated\_at | datetime                            | The last date this entry was updated in the IGDB database |

## Game Mode

```shell
curl 'https://api.igdb.com/v4/game_modes' \
-d 'fields checksum,created_at,name,slug,updated_at,url;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/game_modes",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,created_at,name,slug,updated_at,url;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/game_modes")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,created_at,name,slug,updated_at,url;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/game_modes".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,created_at,name,slug,updated_at,url;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/game_modes")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,created_at,name,slug,updated_at,url;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/game_modes'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,created_at,name,slug,updated_at,url;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/game_modes', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,created_at,name,slug,updated_at,url;'})
print ("response: %s" % str(response.json()))

```

Single player, Multiplayer etc

### Request Path

`https://api.igdb.com/v4/game_modes`

| field       | type     | description                                               |
| ----------- | -------- | --------------------------------------------------------- |
| checksum    | uuid     | Hash of the object                                        |
| created\_at | datetime | Date this was initially added to the IGDB database        |
| name        | String   | The name of the game mode                                 |
| slug        | String   | A url-safe, unique, lower-case version of the name        |
| updated\_at | datetime | The last date this entry was updated in the IGDB database |
| url         | String   | The website address (URL) of the item                     |

## Game Release Format

```shell
curl 'https://api.igdb.com/v4/game_release_formats' \
-d 'fields checksum,created_at,format,updated_at;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/game_release_formats",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,created_at,format,updated_at;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/game_release_formats")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,created_at,format,updated_at;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/game_release_formats".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,created_at,format,updated_at;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/game_release_formats")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,created_at,format,updated_at;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/game_release_formats'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,created_at,format,updated_at;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/game_release_formats', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,created_at,format,updated_at;'})
print ("response: %s" % str(response.json()))

```

The format of the game release

### Request Path

`https://api.igdb.com/v4/game_release_formats`

| field       | type     | description                                               |
| ----------- | -------- | --------------------------------------------------------- |
| checksum    | uuid     | Hash of the object                                        |
| created\_at | datetime | Date this was initially added to the IGDB database        |
| format      | String   |                                                           |
| updated\_at | datetime | The last date this entry was updated in the IGDB database |

## Game Status

```shell
curl 'https://api.igdb.com/v4/game_statuses' \
-d 'fields checksum,created_at,status,updated_at;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/game_statuses",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,created_at,status,updated_at;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/game_statuses")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,created_at,status,updated_at;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/game_statuses".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,created_at,status,updated_at;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/game_statuses")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,created_at,status,updated_at;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/game_statuses'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,created_at,status,updated_at;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/game_statuses', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,created_at,status,updated_at;'})
print ("response: %s" % str(response.json()))

```

The release status of the game

### Request Path

`https://api.igdb.com/v4/game_statuses`

| field       | type     | description                                               |
| ----------- | -------- | --------------------------------------------------------- |
| checksum    | uuid     | Hash of the object                                        |
| created\_at | datetime | Date this was initially added to the IGDB database        |
| status      | String   |                                                           |
| updated\_at | datetime | The last date this entry was updated in the IGDB database |

## Game Time To Beat

```shell
curl 'https://api.igdb.com/v4/game_time_to_beats' \
-d 'fields checksum,completely,count,created_at,game_id,hastily,normally,updated_at;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/game_time_to_beats",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,completely,count,created_at,game_id,hastily,normally,updated_at;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/game_time_to_beats")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,completely,count,created_at,game_id,hastily,normally,updated_at;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/game_time_to_beats".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,completely,count,created_at,game_id,hastily,normally,updated_at;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/game_time_to_beats")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,completely,count,created_at,game_id,hastily,normally,updated_at;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/game_time_to_beats'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,completely,count,created_at,game_id,hastily,normally,updated_at;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/game_time_to_beats', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,completely,count,created_at,game_id,hastily,normally,updated_at;'})
print ("response: %s" % str(response.json()))

```

Average time to beat times for a game.

### Request Path

`https://api.igdb.com/v4/game_time_to_beats`

| field       | type     | description                                                                                                                 |
| ----------- | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| checksum    | uuid     | Hash of the object                                                                                                          |
| completely  | Integer  | Average time (in seconds) to finish the game to 100% completion.                                                            |
| count       | Integer  | Total number of time to beat submissions for this game                                                                      |
| created\_at | datetime | Date this was initially added to the IGDB database                                                                          |
| game\_id    | Integer  | The ID of the game associated with the time to beat data                                                                    |
| hastily     | Integer  | Average time (in seconds) to finish the game to its credits without spending notable time on extras such as side quests.    |
| normally    | Integer  | Average time (in seconds) to finish the game while mixing in some extras such as side quests without being overly thorough. |
| updated\_at | datetime | The last date this entry was updated in the IGDB database                                                                   |

## Game Type

```shell
curl 'https://api.igdb.com/v4/game_types' \
-d 'fields checksum,created_at,type,updated_at;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/game_types",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,created_at,type,updated_at;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/game_types")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,created_at,type,updated_at;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/game_types".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,created_at,type,updated_at;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/game_types")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,created_at,type,updated_at;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/game_types'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,created_at,type,updated_at;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/game_types', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,created_at,type,updated_at;'})
print ("response: %s" % str(response.json()))

```

The type that this game is

### Request Path

`https://api.igdb.com/v4/game_types`

| field       | type     | description                                               |
| ----------- | -------- | --------------------------------------------------------- |
| checksum    | uuid     | Hash of the object                                        |
| created\_at | datetime | Date this was initially added to the IGDB database        |
| type        | String   |                                                           |
| updated\_at | datetime | The last date this entry was updated in the IGDB database |

## Game Version

```shell
curl 'https://api.igdb.com/v4/game_versions' \
-d 'fields checksum,created_at,features,game,games,updated_at,url;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/game_versions",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,created_at,features,game,games,updated_at,url;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/game_versions")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,created_at,features,game,games,updated_at,url;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/game_versions".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,created_at,features,game,games,updated_at,url;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/game_versions")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,created_at,features,game,games,updated_at,url;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/game_versions'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,created_at,features,game,games,updated_at,url;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/game_versions', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,created_at,features,game,games,updated_at,url;'})
print ("response: %s" % str(response.json()))

```

Details about game editions and versions.

### Request Path

`https://api.igdb.com/v4/game_versions`

| field       | type                                                        | description                                                                               |
| ----------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| checksum    | uuid                                                        | Hash of the object                                                                        |
| created\_at | datetime                                                    | Date this was initially added to the IGDB database                                        |
| features    | Array of [ Game Version Feature](#game-version-feature) IDs | Features and descriptions of what makes each version/edition different from the main game |
| game        | Reference ID for [Game](#game)                              | The game these versions/editions are of                                                   |
| games       | Array of [Game](#game) IDs                                  | Game Versions and Editions                                                                |
| updated\_at | datetime                                                    | The last date this entry was updated in the IGDB database                                 |
| url         | String                                                      | The website address (URL) of the item                                                     |

## Game Version Feature

```shell
curl 'https://api.igdb.com/v4/game_version_features' \
-d 'fields category,checksum,description,position,title,values;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/game_version_features",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields category,checksum,description,position,title,values;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/game_version_features")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields category,checksum,description,position,title,values;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/game_version_features".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields category,checksum,description,position,title,values;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/game_version_features")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields category,checksum,description,position,title,values;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/game_version_features'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields category,checksum,description,position,title,values;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/game_version_features', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields category,checksum,description,position,title,values;'})
print ("response: %s" % str(response.json()))

```

Features and descriptions of what makes each version/edition different from the main game

### Request Path

`https://api.igdb.com/v4/game_version_features`

| field       | type                                                                    | description                                      |
| ----------- | ----------------------------------------------------------------------- | ------------------------------------------------ |
| category    | [Category Enum](#game-version-feature-enums)                            | The category of the feature description          |
| checksum    | uuid                                                                    | Hash of the object                               |
| description | String                                                                  | The description of the feature                   |
| position    | Integer                                                                 | Position of this feature in the list of features |
| title       | String                                                                  | The title of the feature                         |
| values      | Array of [ Game Version Feature Value](#game-version-feature-value) IDs | The bool/text value of the feature               |

### Game Version Feature Enums

category

| name        | value |
| ----------- | ----- |
| boolean     | 0     |
| description | 1     |

## Game Version Feature Value

```shell
curl 'https://api.igdb.com/v4/game_version_feature_values' \
-d 'fields checksum,game,game_feature,included_feature,note;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/game_version_feature_values",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,game,game_feature,included_feature,note;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/game_version_feature_values")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,game,game_feature,included_feature,note;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/game_version_feature_values".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,game,game_feature,included_feature,note;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/game_version_feature_values")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,game,game_feature,included_feature,note;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/game_version_feature_values'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,game,game_feature,included_feature,note;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/game_version_feature_values', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,game,game_feature,included_feature,note;'})
print ("response: %s" % str(response.json()))

```

The bool/text value of the feature

### Request Path

`https://api.igdb.com/v4/game_version_feature_values`

| field             | type                                                            | description                              |
| ----------------- | --------------------------------------------------------------- | ---------------------------------------- |
| checksum          | uuid                                                            | Hash of the object                       |
| game              | Reference ID for [Game](#game)                                  | The version/edition this value refers to |
| game\_feature     | Reference ID for [ Game Version Feature](#game-version-feature) | The id of the game feature               |
| included\_feature | [Included Feature Enum](#game-version-feature-value-enums)      | The boole value of this feature          |
| note              | String                                                          | The text value of this feature           |

### Game Version Feature Value Enums

included\_feature

| name             | value |
| ---------------- | ----- |
| NOT\_INCLUDED    | 0     |
| INCLUDED         | 1     |
| PRE\_ORDER\_ONLY | 2     |

## Game Video

```shell
curl 'https://api.igdb.com/v4/game_videos' \
-d 'fields checksum,game,name,video_id;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/game_videos",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,game,name,video_id;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/game_videos")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,game,name,video_id;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/game_videos".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,game,name,video_id;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/game_videos")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,game,name,video_id;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/game_videos'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,game,name,video_id;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/game_videos', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,game,name,video_id;'})
print ("response: %s" % str(response.json()))

```

A video associated with a game

### Request Path

`https://api.igdb.com/v4/game_videos`

| field     | type                           | description                                  |
| --------- | ------------------------------ | -------------------------------------------- |
| checksum  | uuid                           | Hash of the object                           |
| game      | Reference ID for [Game](#game) | The game this video is associated with       |
| name      | String                         | The name of the video                        |
| video\_id | String                         | The external ID of the video (YouTube Links) |

## Genre

```shell
curl 'https://api.igdb.com/v4/genres' \
-d 'fields checksum,created_at,name,slug,updated_at,url;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/genres",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,created_at,name,slug,updated_at,url;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/genres")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,created_at,name,slug,updated_at,url;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/genres".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,created_at,name,slug,updated_at,url;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/genres")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,created_at,name,slug,updated_at,url;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/genres'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,created_at,name,slug,updated_at,url;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/genres', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,created_at,name,slug,updated_at,url;'})
print ("response: %s" % str(response.json()))

```

Genres of video game

### Request Path

`https://api.igdb.com/v4/genres`

| field       | type     | description                                               |
| ----------- | -------- | --------------------------------------------------------- |
| checksum    | uuid     | Hash of the object                                        |
| created\_at | datetime | Date this was initially added to the IGDB database        |
| name        | String   |                                                           |
| slug        | String   | A url-safe, unique, lower-case version of the name        |
| updated\_at | datetime | The last date this entry was updated in the IGDB database |
| url         | String   | The website address (URL) of the item                     |

## Involved Company

```shell
curl 'https://api.igdb.com/v4/involved_companies' \
-d 'fields checksum,company,created_at,developer,game,porting,publisher,supporting,updated_at;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/involved_companies",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,company,created_at,developer,game,porting,publisher,supporting,updated_at;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/involved_companies")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,company,created_at,developer,game,porting,publisher,supporting,updated_at;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/involved_companies".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,company,created_at,developer,game,porting,publisher,supporting,updated_at;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/involved_companies")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,company,created_at,developer,game,porting,publisher,supporting,updated_at;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/involved_companies'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,company,created_at,developer,game,porting,publisher,supporting,updated_at;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/involved_companies', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,company,created_at,developer,game,porting,publisher,supporting,updated_at;'})
print ("response: %s" % str(response.json()))

```

### Request Path

`https://api.igdb.com/v4/involved_companies`

| field       | type                                 | description                                               |
| ----------- | ------------------------------------ | --------------------------------------------------------- |
| checksum    | uuid                                 | Hash of the object                                        |
| company     | Reference ID for [Company](#company) |                                                           |
| created\_at | datetime                             | Date this was initially added to the IGDB database        |
| developer   | boolean                              |                                                           |
| game        | Reference ID for [Game](#game)       |                                                           |
| porting     | boolean                              |                                                           |
| publisher   | boolean                              |                                                           |
| supporting  | boolean                              |                                                           |
| updated\_at | datetime                             | The last date this entry was updated in the IGDB database |

## Keyword

```shell
curl 'https://api.igdb.com/v4/keywords' \
-d 'fields checksum,created_at,name,slug,updated_at,url;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/keywords",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,created_at,name,slug,updated_at,url;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/keywords")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,created_at,name,slug,updated_at,url;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/keywords".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,created_at,name,slug,updated_at,url;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/keywords")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,created_at,name,slug,updated_at,url;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/keywords'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,created_at,name,slug,updated_at,url;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/keywords', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,created_at,name,slug,updated_at,url;'})
print ("response: %s" % str(response.json()))

```

Keywords are words or phrases that get tagged to a game such as “world war 2” or “steampunk”.

### Request Path

`https://api.igdb.com/v4/keywords`

| field       | type     | description                                               |
| ----------- | -------- | --------------------------------------------------------- |
| checksum    | uuid     | Hash of the object                                        |
| created\_at | datetime | Date this was initially added to the IGDB database        |
| name        | String   |                                                           |
| slug        | String   | A url-safe, unique, lower-case version of the name        |
| updated\_at | datetime | The last date this entry was updated in the IGDB database |
| url         | String   | The website address (URL) of the item                     |

## Language

```shell
curl 'https://api.igdb.com/v4/languages' \
-d 'fields checksum,created_at,locale,name,native_name,updated_at;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/languages",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,created_at,locale,name,native_name,updated_at;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/languages")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,created_at,locale,name,native_name,updated_at;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/languages".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,created_at,locale,name,native_name,updated_at;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/languages")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,created_at,locale,name,native_name,updated_at;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/languages'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,created_at,locale,name,native_name,updated_at;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/languages', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,created_at,locale,name,native_name,updated_at;'})
print ("response: %s" % str(response.json()))

```

Languages that are used in the Language Support endpoint.

### Request Path

`https://api.igdb.com/v4/languages`

| field        | type     | description                                               |
| ------------ | -------- | --------------------------------------------------------- |
| checksum     | uuid     | Hash of the object                                        |
| created\_at  | datetime | Date this was initially added to the IGDB database        |
| locale       | String   | The combination of Language code and Country code         |
| name         | String   | The English name of the Language                          |
| native\_name | String   | The Native Name of the Language                           |
| updated\_at  | datetime | The last date this entry was updated in the IGDB database |

## Language Support

```shell
curl 'https://api.igdb.com/v4/language_supports' \
-d 'fields checksum,created_at,game,language,language_support_type,updated_at;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/language_supports",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,created_at,game,language,language_support_type,updated_at;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/language_supports")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,created_at,game,language,language_support_type,updated_at;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/language_supports".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,created_at,game,language,language_support_type,updated_at;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/language_supports")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,created_at,game,language,language_support_type,updated_at;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/language_supports'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,created_at,game,language,language_support_type,updated_at;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/language_supports', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,created_at,game,language,language_support_type,updated_at;'})
print ("response: %s" % str(response.json()))

```

Games can be played with different languages for voice acting, subtitles, or the interface language.

### Request Path

`https://api.igdb.com/v4/language_supports`

| field                   | type                                                              | description                                               |
| ----------------------- | ----------------------------------------------------------------- | --------------------------------------------------------- |
| checksum                | uuid                                                              | Hash of the object                                        |
| created\_at             | datetime                                                          | Date this was initially added to the IGDB database        |
| game                    | Reference ID for [ Game](#game)                                   |                                                           |
| language                | Reference ID for [ Language](#language)                           |                                                           |
| language\_support\_type | Reference ID for [ Language Support Type](#language-support-type) |                                                           |
| updated\_at             | datetime                                                          | The last date this entry was updated in the IGDB database |

## Language Support Type

```shell
curl 'https://api.igdb.com/v4/language_support_types' \
-d 'fields checksum,created_at,name,updated_at;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/language_support_types",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,created_at,name,updated_at;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/language_support_types")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,created_at,name,updated_at;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/language_support_types".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,created_at,name,updated_at;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/language_support_types")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,created_at,name,updated_at;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/language_support_types'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,created_at,name,updated_at;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/language_support_types', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,created_at,name,updated_at;'})
print ("response: %s" % str(response.json()))

```

Language Support Types contains the identifiers for the support types that Language Support uses.

### Request Path

`https://api.igdb.com/v4/language_support_types`

| field       | type     | description                                               |
| ----------- | -------- | --------------------------------------------------------- |
| checksum    | uuid     | Hash of the object                                        |
| created\_at | datetime | Date this was initially added to the IGDB database        |
| name        | String   |                                                           |
| updated\_at | datetime | The last date this entry was updated in the IGDB database |

## Multiplayer Mode

```shell
curl 'https://api.igdb.com/v4/multiplayer_modes' \
-d 'fields campaigncoop,checksum,dropin,game,lancoop,offlinecoop,offlinecoopmax,offlinemax,onlinecoop,onlinecoopmax,onlinemax,platform,splitscreen,splitscreenonline;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/multiplayer_modes",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields campaigncoop,checksum,dropin,game,lancoop,offlinecoop,offlinecoopmax,offlinemax,onlinecoop,onlinecoopmax,onlinemax,platform,splitscreen,splitscreenonline;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/multiplayer_modes")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields campaigncoop,checksum,dropin,game,lancoop,offlinecoop,offlinecoopmax,offlinemax,onlinecoop,onlinecoopmax,onlinemax,platform,splitscreen,splitscreenonline;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/multiplayer_modes".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields campaigncoop,checksum,dropin,game,lancoop,offlinecoop,offlinecoopmax,offlinemax,onlinecoop,onlinecoopmax,onlinemax,platform,splitscreen,splitscreenonline;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/multiplayer_modes")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields campaigncoop,checksum,dropin,game,lancoop,offlinecoop,offlinecoopmax,offlinemax,onlinecoop,onlinecoopmax,onlinemax,platform,splitscreen,splitscreenonline;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/multiplayer_modes'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields campaigncoop,checksum,dropin,game,lancoop,offlinecoop,offlinecoopmax,offlinemax,onlinecoop,onlinecoopmax,onlinemax,platform,splitscreen,splitscreenonline;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/multiplayer_modes', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields campaigncoop,checksum,dropin,game,lancoop,offlinecoop,offlinecoopmax,offlinemax,onlinecoop,onlinecoopmax,onlinemax,platform,splitscreen,splitscreenonline;'})
print ("response: %s" % str(response.json()))

```

Data about the supported multiplayer types

### Request Path

`https://api.igdb.com/v4/multiplayer_modes`

| field             | type                                   | description                                                 |
| ----------------- | -------------------------------------- | ----------------------------------------------------------- |
| campaigncoop      | boolean                                | True if the game supports campaign coop                     |
| checksum          | uuid                                   | Hash of the object                                          |
| dropin            | boolean                                | True if the game supports drop in/out multiplayer           |
| game              | Reference ID for [Game](#game)         | The game this multiplayer mode is associated with           |
| lancoop           | boolean                                | True if the game supports LAN coop                          |
| offlinecoop       | boolean                                | True if the game supports offline coop                      |
| offlinecoopmax    | Integer                                | Maximum number of offline players in offline coop           |
| offlinemax        | Integer                                | Maximum number of players in offline multiplayer            |
| onlinecoop        | boolean                                | True if the game supports online coop                       |
| onlinecoopmax     | Integer                                | Maximum number of online players in online coop             |
| onlinemax         | Integer                                | Maximum number of players in online multiplayer             |
| platform          | Reference ID for [Platform](#platform) | The platform this multiplayer mode refers to                |
| splitscreen       | boolean                                | True if the game supports split screen, offline multiplayer |
| splitscreenonline | boolean                                | True if the game supports split screen, online multiplayer  |

## Network Type

```shell
curl 'https://api.igdb.com/v4/network_types' \
-d 'fields checksum,created_at,event_networks,name,updated_at;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/network_types",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,created_at,event_networks,name,updated_at;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/network_types")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,created_at,event_networks,name,updated_at;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/network_types".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,created_at,event_networks,name,updated_at;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/network_types")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,created_at,event_networks,name,updated_at;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/network_types'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,created_at,event_networks,name,updated_at;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/network_types', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,created_at,event_networks,name,updated_at;'})
print ("response: %s" % str(response.json()))

```

Social networks related to the event like twitter, facebook and youtube

### Request Path

`https://api.igdb.com/v4/network_types`

| field           | type                                          | description                                               |
| --------------- | --------------------------------------------- | --------------------------------------------------------- |
| checksum        | uuid                                          | Hash of the object                                        |
| created\_at     | datetime                                      | Date this was initially added to the IGDB database        |
| event\_networks | Array of [ Event Network](#event-network) IDs | Urls associated with the event type                       |
| name            | String                                        |                                                           |
| updated\_at     | datetime                                      | The last date this entry was updated in the IGDB database |

## Platform

```shell
curl 'https://api.igdb.com/v4/platforms' \
-d 'fields abbreviation,alternative_name,category,checksum,created_at,generation,name,platform_family,platform_logo,platform_type,slug,summary,updated_at,url,versions,websites;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/platforms",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields abbreviation,alternative_name,category,checksum,created_at,generation,name,platform_family,platform_logo,platform_type,slug,summary,updated_at,url,versions,websites;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/platforms")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields abbreviation,alternative_name,category,checksum,created_at,generation,name,platform_family,platform_logo,platform_type,slug,summary,updated_at,url,versions,websites;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/platforms".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields abbreviation,alternative_name,category,checksum,created_at,generation,name,platform_family,platform_logo,platform_type,slug,summary,updated_at,url,versions,websites;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/platforms")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields abbreviation,alternative_name,category,checksum,created_at,generation,name,platform_family,platform_logo,platform_type,slug,summary,updated_at,url,versions,websites;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/platforms'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields abbreviation,alternative_name,category,checksum,created_at,generation,name,platform_family,platform_logo,platform_type,slug,summary,updated_at,url,versions,websites;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/platforms', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields abbreviation,alternative_name,category,checksum,created_at,generation,name,platform_family,platform_logo,platform_type,slug,summary,updated_at,url,versions,websites;'})
print ("response: %s" % str(response.json()))

```

**Deprecated Fields:**

* `category`: DEPRECATED! Use `platform_type` instead

The hardware used to run the game or game delivery network

### Request Path

`https://api.igdb.com/v4/platforms`

| field             | type                                                 | description                                               |
| ----------------- | ---------------------------------------------------- | --------------------------------------------------------- |
| abbreviation      | String                                               | An abbreviation of the platform name                      |
| alternative\_name | String                                               | An alternative name for the platform                      |
| category          | [Category Enum](#platform-enums)                     | DEPRECATED! Use platform\_type instead                    |
| checksum          | uuid                                                 | Hash of the object                                        |
| created\_at       | datetime                                             | Date this was initially added to the IGDB database        |
| generation        | Integer                                              | The generation of the platform                            |
| name              | String                                               | The name of the platform                                  |
| platform\_family  | Reference ID for [Platform Family](#platform-family) | The family of platforms this one belongs to               |
| platform\_logo    | Reference ID for [Platform Logo](#platform-logo)     | The logo of the first Version of this platform            |
| platform\_type    | Reference ID for [ Platform Type](#platform-type)    | The type of the platform                                  |
| slug              | String                                               | A url-safe, unique, lower-case version of the name        |
| summary           | String                                               | The summary of the first Version of this platform         |
| updated\_at       | datetime                                             | The last date this entry was updated in the IGDB database |
| url               | String                                               | The website address (URL) of the item                     |
| versions          | Array of [ Platform Version](#platform-version) IDs  | Associated versions of this platform                      |
| websites          | Array of [ Platform Website](#platform-website) IDs  | The main website                                          |

### Platform Enums

category

| name              | value |
| ----------------- | ----- |
| console           | 1     |
| arcade            | 2     |
| platform          | 3     |
| operating\_system | 4     |
| portable\_console | 5     |
| computer          | 6     |

## Platform Family

```shell
curl 'https://api.igdb.com/v4/platform_families' \
-d 'fields checksum,name,slug;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/platform_families",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,name,slug;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/platform_families")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,name,slug;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/platform_families".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,name,slug;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/platform_families")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,name,slug;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/platform_families'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,name,slug;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/platform_families', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,name,slug;'})
print ("response: %s" % str(response.json()))

```

A collection of closely related platforms

### Request Path

`https://api.igdb.com/v4/platform_families`

| field    | type   | description                                        |
| -------- | ------ | -------------------------------------------------- |
| checksum | uuid   | Hash of the object                                 |
| name     | String | The name of the platform family                    |
| slug     | String | A url-safe, unique, lower-case version of the name |

## Platform Logo

```shell
curl 'https://api.igdb.com/v4/platform_logos' \
-d 'fields alpha_channel,animated,checksum,height,image_id,url,width;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/platform_logos",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields alpha_channel,animated,checksum,height,image_id,url,width;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/platform_logos")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields alpha_channel,animated,checksum,height,image_id,url,width;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/platform_logos".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields alpha_channel,animated,checksum,height,image_id,url,width;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/platform_logos")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields alpha_channel,animated,checksum,height,image_id,url,width;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/platform_logos'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields alpha_channel,animated,checksum,height,image_id,url,width;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/platform_logos', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields alpha_channel,animated,checksum,height,image_id,url,width;'})
print ("response: %s" % str(response.json()))

```

Logo for a platform

### Request Path

`https://api.igdb.com/v4/platform_logos`

| field          | type    | description                                              |
| -------------- | ------- | -------------------------------------------------------- |
| alpha\_channel | boolean |                                                          |
| animated       | boolean |                                                          |
| checksum       | uuid    | Hash of the object                                       |
| height         | Integer | The height of the image in pixels                        |
| image\_id      | String  | The ID of the image used to construct an IGDB image link |
| url            | String  | The website address (URL) of the item                    |
| width          | Integer | The width of the image in pixels                         |

## Platform Type

```shell
curl 'https://api.igdb.com/v4/platform_types' \
-d 'fields checksum,created_at,name,updated_at;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/platform_types",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,created_at,name,updated_at;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/platform_types")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,created_at,name,updated_at;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/platform_types".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,created_at,name,updated_at;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/platform_types")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,created_at,name,updated_at;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/platform_types'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,created_at,name,updated_at;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/platform_types', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,created_at,name,updated_at;'})
print ("response: %s" % str(response.json()))

```

Types of platforms

### Request Path

`https://api.igdb.com/v4/platform_types`

| field       | type     | description                                               |
| ----------- | -------- | --------------------------------------------------------- |
| checksum    | uuid     | Hash of the object                                        |
| created\_at | datetime | Date this was initially added to the IGDB database        |
| name        | String   |                                                           |
| updated\_at | datetime | The last date this entry was updated in the IGDB database |

## Platform Version

```shell
curl 'https://api.igdb.com/v4/platform_versions' \
-d 'fields checksum,companies,connectivity,cpu,graphics,main_manufacturer,media,memory,name,os,output,platform_logo,platform_version_release_dates,resolutions,slug,sound,storage,summary,url;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/platform_versions",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,companies,connectivity,cpu,graphics,main_manufacturer,media,memory,name,os,output,platform_logo,platform_version_release_dates,resolutions,slug,sound,storage,summary,url;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/platform_versions")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,companies,connectivity,cpu,graphics,main_manufacturer,media,memory,name,os,output,platform_logo,platform_version_release_dates,resolutions,slug,sound,storage,summary,url;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/platform_versions".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,companies,connectivity,cpu,graphics,main_manufacturer,media,memory,name,os,output,platform_logo,platform_version_release_dates,resolutions,slug,sound,storage,summary,url;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/platform_versions")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,companies,connectivity,cpu,graphics,main_manufacturer,media,memory,name,os,output,platform_logo,platform_version_release_dates,resolutions,slug,sound,storage,summary,url;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/platform_versions'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,companies,connectivity,cpu,graphics,main_manufacturer,media,memory,name,os,output,platform_logo,platform_version_release_dates,resolutions,slug,sound,storage,summary,url;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/platform_versions', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,companies,connectivity,cpu,graphics,main_manufacturer,media,memory,name,os,output,platform_logo,platform_version_release_dates,resolutions,slug,sound,storage,summary,url;'})
print ("response: %s" % str(response.json()))

```

### Request Path

`https://api.igdb.com/v4/platform_versions`

| field                             | type                                                                         | description                                            |
| --------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------ |
| checksum                          | uuid                                                                         | Hash of the object                                     |
| companies                         | Array of [ Platform Version Company](#platform-version-company) IDs          | Who developed this platform version                    |
| connectivity                      | String                                                                       | The network capabilities                               |
| cpu                               | String                                                                       | The integrated control processing unit                 |
| graphics                          | String                                                                       | The graphics chipset                                   |
| main\_manufacturer                | Reference ID for [ Platform Version Company](#platform-version-company)      | Who manufactured this version of the platform          |
| media                             | String                                                                       | The type of media this version accepted                |
| memory                            | String                                                                       | How much memory there is                               |
| name                              | String                                                                       | The name of the platform version                       |
| os                                | String                                                                       | The operating system installed on the platform version |
| output                            | String                                                                       | The output video rate                                  |
| platform\_logo                    | Reference ID for [Platform Logo](#platform-logo)                             | The logo of this platform version                      |
| platform\_version\_release\_dates | Array of [Platform Version Release Date](#platform-version-release-date) IDs | When this platform was released                        |
| resolutions                       | String                                                                       | The maximum resolution                                 |
| slug                              | String                                                                       | A url-safe, unique, lower-case version of the name     |
| sound                             | String                                                                       | The sound chipset                                      |
| storage                           | String                                                                       | How much storage there is                              |
| summary                           | String                                                                       | A short summary                                        |
| url                               | String                                                                       | The website address (URL) of the item                  |

## Platform Version Company

```shell
curl 'https://api.igdb.com/v4/platform_version_companies' \
-d 'fields checksum,comment,company,developer,manufacturer;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/platform_version_companies",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,comment,company,developer,manufacturer;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/platform_version_companies")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,comment,company,developer,manufacturer;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/platform_version_companies".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,comment,company,developer,manufacturer;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/platform_version_companies")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,comment,company,developer,manufacturer;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/platform_version_companies'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,comment,company,developer,manufacturer;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/platform_version_companies', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,comment,company,developer,manufacturer;'})
print ("response: %s" % str(response.json()))

```

A platform developer

### Request Path

`https://api.igdb.com/v4/platform_version_companies`

| field        | type                                 | description                                                  |
| ------------ | ------------------------------------ | ------------------------------------------------------------ |
| checksum     | uuid                                 | Hash of the object                                           |
| comment      | String                               | Any notable comments about the developer                     |
| company      | Reference ID for [Company](#company) | The company responsible for developing this platform version |
| developer    | boolean                              |                                                              |
| manufacturer | boolean                              |                                                              |

## Platform Version Release Date

```shell
curl 'https://api.igdb.com/v4/platform_version_release_dates' \
-d 'fields category,checksum,created_at,date,date_format,human,m,platform_version,region,release_region,updated_at,y;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/platform_version_release_dates",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields category,checksum,created_at,date,date_format,human,m,platform_version,region,release_region,updated_at,y;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/platform_version_release_dates")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields category,checksum,created_at,date,date_format,human,m,platform_version,region,release_region,updated_at,y;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/platform_version_release_dates".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields category,checksum,created_at,date,date_format,human,m,platform_version,region,release_region,updated_at,y;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/platform_version_release_dates")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields category,checksum,created_at,date,date_format,human,m,platform_version,region,release_region,updated_at,y;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/platform_version_release_dates'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields category,checksum,created_at,date,date_format,human,m,platform_version,region,release_region,updated_at,y;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/platform_version_release_dates', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields category,checksum,created_at,date,date_format,human,m,platform_version,region,release_region,updated_at,y;'})
print ("response: %s" % str(response.json()))

```

**Deprecated Fields:**

* `category`: DEPRECATED! Use `date_format` instead
* `region`: DEPRECATED! Use `release_region` instead

A handy endpoint that extends platform release dates. Used to dig deeper into release dates, platforms and versions.

### Request Path

`https://api.igdb.com/v4/platform_version_release_dates`

| field             | type                                                          | description                                               |
| ----------------- | ------------------------------------------------------------- | --------------------------------------------------------- |
| category          | [Category Enum](#platform-version-release-date-enums)         | DEPRECATED! Use date\_format instead                      |
| checksum          | uuid                                                          | Hash of the object                                        |
| created\_at       | datetime                                                      | Date this was initially added to the IGDB database        |
| date              | Unix Time Stamp                                               | The release date                                          |
| date\_format      | Reference ID for [ Date Format](#date-format)                 | The format of the change date                             |
| human             | String                                                        | A human readable version of the release date              |
| m                 | Integer                                                       | The month as an integer starting at 1 (January)           |
| platform\_version | Reference ID for [Platform Version](#platform-version)        | The platform this release date is for                     |
| region            | [Region Enum](#platform-version-release-date-enums)           | DEPRECATED! Use release\_region instead                   |
| release\_region   | Reference ID for [ Release Date Region](#release-date-region) | The region of the release                                 |
| updated\_at       | datetime                                                      | The last date this entry was updated in the IGDB database |
| y                 | Integer                                                       | The year in full (2018)                                   |

### Platform Version Release Date Enums

category

| name       | value |
| ---------- | ----- |
| YYYYMMMMDD | 0     |
| YYYYMMMM   | 1     |
| YYYY       | 2     |
| YYYYQ1     | 3     |
| YYYYQ2     | 4     |
| YYYYQ3     | 5     |
| YYYYQ4     | 6     |
| TBD        | 7     |

region

| name           | value |
| -------------- | ----- |
| europe         | 1     |
| north\_america | 2     |
| australia      | 3     |
| new\_zealand   | 4     |
| japan          | 5     |
| china          | 6     |
| asia           | 7     |
| worldwide      | 8     |
| korea          | 9     |
| brazil         | 10    |

## Platform Website

```shell
curl 'https://api.igdb.com/v4/platform_websites' \
-d 'fields category,checksum,trusted,type,url;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/platform_websites",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields category,checksum,trusted,type,url;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/platform_websites")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields category,checksum,trusted,type,url;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/platform_websites".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields category,checksum,trusted,type,url;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/platform_websites")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields category,checksum,trusted,type,url;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/platform_websites'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields category,checksum,trusted,type,url;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/platform_websites', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields category,checksum,trusted,type,url;'})
print ("response: %s" % str(response.json()))

```

**Deprecated Fields:**

* `category`: DEPRECATED! Use `type` instead

The main website for the platform

### Request Path

`https://api.igdb.com/v4/platform_websites`

| field    | type                                            | description                                  |
| -------- | ----------------------------------------------- | -------------------------------------------- |
| category | [Category Enum](#platform-website-enums)        | DEPRECATED! Use type instead                 |
| checksum | uuid                                            | Hash of the object                           |
| trusted  | boolean                                         |                                              |
| type     | Reference ID for [ Website Type](#website-type) | The website type associated with the website |
| url      | String                                          | The website address (URL) of the item        |

### Platform Website Enums

category

| name         | value |
| ------------ | ----- |
| official     | 1     |
| wikia        | 2     |
| wikipedia    | 3     |
| facebook     | 4     |
| twitter      | 5     |
| twitch       | 6     |
| instagram    | 8     |
| youtube      | 9     |
| iphone       | 10    |
| ipad         | 11    |
| android      | 12    |
| steam        | 13    |
| reddit       | 14    |
| discord      | 15    |
| google\_plus | 16    |
| tumblr       | 17    |
| linkedin     | 18    |
| pinterest    | 19    |
| soundcloud   | 20    |

## Player Perspective

```shell
curl 'https://api.igdb.com/v4/player_perspectives' \
-d 'fields checksum,created_at,name,slug,updated_at,url;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/player_perspectives",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,created_at,name,slug,updated_at,url;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/player_perspectives")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,created_at,name,slug,updated_at,url;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/player_perspectives".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,created_at,name,slug,updated_at,url;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/player_perspectives")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,created_at,name,slug,updated_at,url;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/player_perspectives'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,created_at,name,slug,updated_at,url;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/player_perspectives', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,created_at,name,slug,updated_at,url;'})
print ("response: %s" % str(response.json()))

```

Player perspectives describe the view/perspective of the player in a video game.

### Request Path

`https://api.igdb.com/v4/player_perspectives`

| field       | type     | description                                               |
| ----------- | -------- | --------------------------------------------------------- |
| checksum    | uuid     | Hash of the object                                        |
| created\_at | datetime | Date this was initially added to the IGDB database        |
| name        | String   |                                                           |
| slug        | String   | A url-safe, unique, lower-case version of the name        |
| updated\_at | datetime | The last date this entry was updated in the IGDB database |
| url         | String   | The website address (URL) of the item                     |

## Popularity Primitive

```shell
curl 'https://api.igdb.com/v4/popularity_primitives' \
-d 'fields calculated_at,checksum,created_at,external_popularity_source,game_id,popularity_source,popularity_type,updated_at,value;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/popularity_primitives",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields calculated_at,checksum,created_at,external_popularity_source,game_id,popularity_source,popularity_type,updated_at,value;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/popularity_primitives")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields calculated_at,checksum,created_at,external_popularity_source,game_id,popularity_source,popularity_type,updated_at,value;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/popularity_primitives".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields calculated_at,checksum,created_at,external_popularity_source,game_id,popularity_source,popularity_type,updated_at,value;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/popularity_primitives")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields calculated_at,checksum,created_at,external_popularity_source,game_id,popularity_source,popularity_type,updated_at,value;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/popularity_primitives'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields calculated_at,checksum,created_at,external_popularity_source,game_id,popularity_source,popularity_type,updated_at,value;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/popularity_primitives', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields calculated_at,checksum,created_at,external_popularity_source,game_id,popularity_source,popularity_type,updated_at,value;'})
print ("response: %s" % str(response.json()))

```

**Deprecated Fields:**

* `popularity_source`: DEPRECATED! Use `external_popularity_source` instead

Popularity Primitives, this endpoint lists available primitives with their source and popularity type.

### Request Path

`https://api.igdb.com/v4/popularity_primitives`

| field                        | type                                                            | description                                               |
| ---------------------------- | --------------------------------------------------------------- | --------------------------------------------------------- |
| calculated\_at               | datetime                                                        |                                                           |
| checksum                     | uuid                                                            | Hash of the object                                        |
| created\_at                  | datetime                                                        | Date this was initially added to the IGDB database        |
| external\_popularity\_source | Reference ID for [ External Game Source](#external-game-source) |                                                           |
| game\_id                     | Integer                                                         |                                                           |
| popularity\_source           | [Popularity Source Enum](#popularity-primitive-enums)           | DEPRECATED! Use external\_popularity\_source instead      |
| popularity\_type             | Reference ID for [ Popularity Type](#popularity-type)           |                                                           |
| updated\_at                  | datetime                                                        | The last date this entry was updated in the IGDB database |
| value                        | bigdecimal                                                      |                                                           |

### Popularity Primitive Enums

popularity\_source

| name | value |
| ---- | ----- |
| igdb | 121   |

## Popularity Type

```shell
curl 'https://api.igdb.com/v4/popularity_types' \
-d 'fields checksum,created_at,external_popularity_source,name,popularity_source,updated_at;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/popularity_types",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,created_at,external_popularity_source,name,popularity_source,updated_at;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/popularity_types")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,created_at,external_popularity_source,name,popularity_source,updated_at;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/popularity_types".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,created_at,external_popularity_source,name,popularity_source,updated_at;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/popularity_types")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,created_at,external_popularity_source,name,popularity_source,updated_at;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/popularity_types'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,created_at,external_popularity_source,name,popularity_source,updated_at;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/popularity_types', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,created_at,external_popularity_source,name,popularity_source,updated_at;'})
print ("response: %s" % str(response.json()))

```

**Deprecated Fields:**

* `popularity_source`: DEPRECATED! Use `external_popularity_source` instead

This describes what type of popularity primitive or popularity indicator the popularity value is.

### Request Path

`https://api.igdb.com/v4/popularity_types`

| field                        | type                                                            | description                                               |
| ---------------------------- | --------------------------------------------------------------- | --------------------------------------------------------- |
| checksum                     | uuid                                                            | Hash of the object                                        |
| created\_at                  | datetime                                                        | Date this was initially added to the IGDB database        |
| external\_popularity\_source | Reference ID for [ External Game Source](#external-game-source) |                                                           |
| name                         | String                                                          |                                                           |
| popularity\_source           | [Popularity Source Enum](#popularity-type-enums)                | DEPRECATED! Use external\_popularity\_source instead      |
| updated\_at                  | datetime                                                        | The last date this entry was updated in the IGDB database |

### Popularity Type Enums

popularity\_source

| name  | value |
| ----- | ----- |
| steam | 1     |
| igdb  | 121   |

## Region

```shell
curl 'https://api.igdb.com/v4/regions' \
-d 'fields category,checksum,created_at,identifier,name,updated_at;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/regions",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields category,checksum,created_at,identifier,name,updated_at;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/regions")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields category,checksum,created_at,identifier,name,updated_at;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/regions".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields category,checksum,created_at,identifier,name,updated_at;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/regions")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields category,checksum,created_at,identifier,name,updated_at;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/regions'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields category,checksum,created_at,identifier,name,updated_at;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/regions', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields category,checksum,created_at,identifier,name,updated_at;'})
print ("response: %s" % str(response.json()))

```

Region for game localization

### Request Path

`https://api.igdb.com/v4/regions`

| field       | type     | description                                               |
| ----------- | -------- | --------------------------------------------------------- |
| category    | String   | This can be either ’locale’ or ‘continent’                |
| checksum    | uuid     | Hash of the object                                        |
| created\_at | datetime | Date this was initially added to the IGDB database        |
| identifier  | String   | This is the identifier of each region                     |
| name        | String   |                                                           |
| updated\_at | datetime | The last date this entry was updated in the IGDB database |

## Release Date

```shell
curl 'https://api.igdb.com/v4/release_dates' \
-d 'fields category,checksum,created_at,d,date,date_format,game,human,m,platform,region,release_region,status,updated_at,y;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/release_dates",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields category,checksum,created_at,d,date,date_format,game,human,m,platform,region,release_region,status,updated_at,y;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/release_dates")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields category,checksum,created_at,d,date,date_format,game,human,m,platform,region,release_region,status,updated_at,y;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/release_dates".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields category,checksum,created_at,d,date,date_format,game,human,m,platform,region,release_region,status,updated_at,y;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/release_dates")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields category,checksum,created_at,d,date,date_format,game,human,m,platform,region,release_region,status,updated_at,y;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/release_dates'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields category,checksum,created_at,d,date,date_format,game,human,m,platform,region,release_region,status,updated_at,y;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/release_dates', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields category,checksum,created_at,d,date,date_format,game,human,m,platform,region,release_region,status,updated_at,y;'})
print ("response: %s" % str(response.json()))

```

**Deprecated Fields:**

* `category`: DEPRECATED! Use `date_format` instead
* `region`: DEPRECATED! Use `release_region` instead

A handy endpoint that extends game release dates. Used to dig deeper into release dates, platforms and versions.

### Request Path

`https://api.igdb.com/v4/release_dates`

| field           | type                                                          | description                                               |
| --------------- | ------------------------------------------------------------- | --------------------------------------------------------- |
| category        | [Category Enum](#release-date-enums)                          | DEPRECATED! Use date\_format instead                      |
| checksum        | uuid                                                          | Hash of the object                                        |
| created\_at     | datetime                                                      | Date this was initially added to the IGDB database        |
| d               | Integer                                                       | The day of the month as an integer                        |
| date            | datetime                                                      | The date of the release                                   |
| date\_format    | Reference ID for [ Date Format](#date-format)                 | The format of the change date                             |
| game            | Reference ID for [Game](#game)                                |                                                           |
| human           | String                                                        | A human readable representation of the date               |
| m               | Integer                                                       | The month as an integer starting at 1 (January)           |
| platform        | Reference ID for [Platform](#platform)                        | The platform of the release                               |
| region          | [Region Enum](#release-date-enums)                            | DEPRECATED! Use release\_region instead                   |
| release\_region | Reference ID for [ Release Date Region](#release-date-region) | The region of the release                                 |
| status          | Reference ID for [ Release Date Status](#release-date-status) | The status of the release.                                |
| updated\_at     | datetime                                                      | The last date this entry was updated in the IGDB database |
| y               | Integer                                                       | The year in full (2018)                                   |

### Release Date Enums

category

| name       | value |
| ---------- | ----- |
| YYYYMMMMDD | 0     |
| YYYYMMMM   | 1     |
| YYYY       | 2     |
| YYYYQ1     | 3     |
| YYYYQ2     | 4     |
| YYYYQ3     | 5     |
| YYYYQ4     | 6     |
| TBD        | 7     |

region

| name           | value |
| -------------- | ----- |
| europe         | 1     |
| north\_america | 2     |
| australia      | 3     |
| new\_zealand   | 4     |
| japan          | 5     |
| china          | 6     |
| asia           | 7     |
| worldwide      | 8     |
| korea          | 9     |
| brazil         | 10    |

## Release Date Region

```shell
curl 'https://api.igdb.com/v4/release_date_regions' \
-d 'fields checksum,created_at,region,updated_at;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/release_date_regions",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,created_at,region,updated_at;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/release_date_regions")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,created_at,region,updated_at;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/release_date_regions".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,created_at,region,updated_at;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/release_date_regions")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,created_at,region,updated_at;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/release_date_regions'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,created_at,region,updated_at;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/release_date_regions', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,created_at,region,updated_at;'})
print ("response: %s" % str(response.json()))

```

Regions for release dates

### Request Path

`https://api.igdb.com/v4/release_date_regions`

| field       | type     | description                                               |
| ----------- | -------- | --------------------------------------------------------- |
| checksum    | uuid     | Hash of the object                                        |
| created\_at | datetime | Date this was initially added to the IGDB database        |
| region      | String   |                                                           |
| updated\_at | datetime | The last date this entry was updated in the IGDB database |

## Release Date Status

```shell
curl 'https://api.igdb.com/v4/release_date_statuses' \
-d 'fields checksum,created_at,description,name,updated_at;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/release_date_statuses",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,created_at,description,name,updated_at;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/release_date_statuses")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,created_at,description,name,updated_at;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/release_date_statuses".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,created_at,description,name,updated_at;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/release_date_statuses")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,created_at,description,name,updated_at;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/release_date_statuses'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,created_at,description,name,updated_at;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/release_date_statuses', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,created_at,description,name,updated_at;'})
print ("response: %s" % str(response.json()))

```

An endpoint to provide definition of all of the current release date statuses.

### Request Path

`https://api.igdb.com/v4/release_date_statuses`

| field       | type     | description                                               |
| ----------- | -------- | --------------------------------------------------------- |
| checksum    | uuid     | Hash of the object                                        |
| created\_at | datetime | Date this was initially added to the IGDB database        |
| description | String   | The description of the release date status.               |
| name        | String   | The name of the release date status.                      |
| updated\_at | datetime | The last date this entry was updated in the IGDB database |

## Report

```shell
curl 'https://api.igdb.com/v4/reports' \
-d 'fields checksum,created_at,entity_type,report_type,source_item_id,target_item_id,updated_at;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/reports",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,created_at,entity_type,report_type,source_item_id,target_item_id,updated_at;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/reports")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,created_at,entity_type,report_type,source_item_id,target_item_id,updated_at;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/reports".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,created_at,entity_type,report_type,source_item_id,target_item_id,updated_at;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/reports")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,created_at,entity_type,report_type,source_item_id,target_item_id,updated_at;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/reports'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,created_at,entity_type,report_type,source_item_id,target_item_id,updated_at;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/reports', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,created_at,entity_type,report_type,source_item_id,target_item_id,updated_at;'})
print ("response: %s" % str(response.json()))

```

A Report provides context about an issue (such as a duplicate or policy violation) flagged for an IGDB entity. When an item is disabled or deleted, the Report is the reason for the status change.

### Request Path

`https://api.igdb.com/v4/reports`

| field            | type                                          | description                                                                                             |
| ---------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| checksum         | uuid                                          | Hash of the object                                                                                      |
| created\_at      | datetime                                      | Date this was initially added to the IGDB database                                                      |
| entity\_type     | Reference ID for [ Entity Type](#entity-type) | The type of entity that the report refers to                                                            |
| report\_type     | Reference ID for [ Report Type](#report-type) | The type of the report                                                                                  |
| source\_item\_id | Integer                                       | The entity that the report refers to                                                                    |
| target\_item\_id | Integer                                       | The entity that the report targets (if applicable), example: replacement game for a Duplicate violation |
| updated\_at      | datetime                                      | The last date this entry was updated in the IGDB database                                               |

## Report Type

```shell
curl 'https://api.igdb.com/v4/report_types' \
-d 'fields checksum,created_at,name,updated_at;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/report_types",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,created_at,name,updated_at;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/report_types")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,created_at,name,updated_at;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/report_types".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,created_at,name,updated_at;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/report_types")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,created_at,name,updated_at;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/report_types'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,created_at,name,updated_at;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/report_types', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,created_at,name,updated_at;'})
print ("response: %s" % str(response.json()))

```

ReportTypes are classifications of the issue within a Report, identifying the specific reason for the flag, such as a Violation, Duplicate, or Invalid entry.

### Request Path

`https://api.igdb.com/v4/report_types`

| field       | type     | description                                               |
| ----------- | -------- | --------------------------------------------------------- |
| checksum    | uuid     | Hash of the object                                        |
| created\_at | datetime | Date this was initially added to the IGDB database        |
| name        | String   |                                                           |
| updated\_at | datetime | The last date this entry was updated in the IGDB database |

## Screenshot

```shell
curl 'https://api.igdb.com/v4/screenshots' \
-d 'fields alpha_channel,animated,checksum,game,height,image_id,url,width;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/screenshots",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields alpha_channel,animated,checksum,game,height,image_id,url,width;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/screenshots")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields alpha_channel,animated,checksum,game,height,image_id,url,width;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/screenshots".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields alpha_channel,animated,checksum,game,height,image_id,url,width;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/screenshots")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields alpha_channel,animated,checksum,game,height,image_id,url,width;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/screenshots'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields alpha_channel,animated,checksum,game,height,image_id,url,width;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/screenshots', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields alpha_channel,animated,checksum,game,height,image_id,url,width;'})
print ("response: %s" % str(response.json()))

```

Screenshots of games

### Request Path

`https://api.igdb.com/v4/screenshots`

| field          | type                           | description                                              |
| -------------- | ------------------------------ | -------------------------------------------------------- |
| alpha\_channel | boolean                        |                                                          |
| animated       | boolean                        |                                                          |
| checksum       | uuid                           | Hash of the object                                       |
| game           | Reference ID for [Game](#game) | The game this video is associated with                   |
| height         | Integer                        | The height of the image in pixels                        |
| image\_id      | String                         | The ID of the image used to construct an IGDB image link |
| url            | String                         | The website address (URL) of the item                    |
| width          | Integer                        | The width of the image in pixels                         |

## Search

```shell
curl 'https://api.igdb.com/v4/search' \
-d 'fields alternative_name,character,checksum,collection,company,description,game,name,platform,published_at,test_dummy,theme;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/search",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields alternative_name,character,checksum,collection,company,description,game,name,platform,published_at,test_dummy,theme;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/search")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields alternative_name,character,checksum,collection,company,description,game,name,platform,published_at,test_dummy,theme;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/search".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields alternative_name,character,checksum,collection,company,description,game,name,platform,published_at,test_dummy,theme;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/search")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields alternative_name,character,checksum,collection,company,description,game,name,platform,published_at,test_dummy,theme;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/search'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields alternative_name,character,checksum,collection,company,description,game,name,platform,published_at,test_dummy,theme;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/search', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields alternative_name,character,checksum,collection,company,description,game,name,platform,published_at,test_dummy,theme;'})
print ("response: %s" % str(response.json()))

```

### Request Path

`https://api.igdb.com/v4/search`

| field             | type                                       | description                                                   |
| ----------------- | ------------------------------------------ | ------------------------------------------------------------- |
| alternative\_name | String                                     |                                                               |
| character         | Reference ID for [Character](#character)   |                                                               |
| checksum          | uuid                                       | Hash of the object                                            |
| collection        | Reference ID for [Collection](#collection) |                                                               |
| company           | Reference ID for [Company](#company)       |                                                               |
| description       | String                                     |                                                               |
| game              | Reference ID for [Game](#game)             |                                                               |
| name              | String                                     |                                                               |
| platform          | Reference ID for [Platform](#platform)     |                                                               |
| published\_at     | Unix Time Stamp                            | The date this item was initially published by the third party |
| test\_dummy       | Reference ID for [Test Dummy](#test-dummy) |                                                               |
| theme             | Reference ID for [Theme](#theme)           |                                                               |

## Theme

```shell
curl 'https://api.igdb.com/v4/themes' \
-d 'fields checksum,created_at,name,slug,updated_at,url;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/themes",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,created_at,name,slug,updated_at,url;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/themes")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,created_at,name,slug,updated_at,url;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/themes".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,created_at,name,slug,updated_at,url;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/themes")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,created_at,name,slug,updated_at,url;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/themes'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,created_at,name,slug,updated_at,url;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/themes', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,created_at,name,slug,updated_at,url;'})
print ("response: %s" % str(response.json()))

```

Video game themes

### Request Path

`https://api.igdb.com/v4/themes`

| field       | type     | description                                               |
| ----------- | -------- | --------------------------------------------------------- |
| checksum    | uuid     | Hash of the object                                        |
| created\_at | datetime | Date this was initially added to the IGDB database        |
| name        | String   |                                                           |
| slug        | String   | A url-safe, unique, lower-case version of the name        |
| updated\_at | datetime | The last date this entry was updated in the IGDB database |
| url         | String   | The website address (URL) of the item                     |

## Website

```shell
curl 'https://api.igdb.com/v4/websites' \
-d 'fields category,checksum,game,trusted,type,url;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/websites",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields category,checksum,game,trusted,type,url;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/websites")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields category,checksum,game,trusted,type,url;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/websites".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields category,checksum,game,trusted,type,url;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/websites")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields category,checksum,game,trusted,type,url;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/websites'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields category,checksum,game,trusted,type,url;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/websites', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields category,checksum,game,trusted,type,url;'})
print ("response: %s" % str(response.json()))

```

**Deprecated Fields:**

* `category`: DEPRECATED! Use `type` instead

A website url, usually associated with a game

### Request Path

`https://api.igdb.com/v4/websites`

| field    | type                                            | description                                  |
| -------- | ----------------------------------------------- | -------------------------------------------- |
| category | [Category Enum](#website-enums)                 | DEPRECATED! Use type instead                 |
| checksum | uuid                                            | Hash of the object                           |
| game     | Reference ID for [Game](#game)                  | The game this website is associated with     |
| trusted  | boolean                                         |                                              |
| type     | Reference ID for [ Website Type](#website-type) | The website type associated with the website |
| url      | String                                          | The website address (URL) of the item        |

### Website Enums

category

| name      | value |
| --------- | ----- |
| official  | 1     |
| wikia     | 2     |
| wikipedia | 3     |
| facebook  | 4     |
| twitter   | 5     |
| twitch    | 6     |
| instagram | 8     |
| youtube   | 9     |
| iphone    | 10    |
| ipad      | 11    |
| android   | 12    |
| steam     | 13    |
| reddit    | 14    |
| itch      | 15    |
| epicgames | 16    |
| gog       | 17    |
| discord   | 18    |
| bluesky   | 19    |

## Website Type

```shell
curl 'https://api.igdb.com/v4/website_types' \
-d 'fields checksum,created_at,type,updated_at;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

```javascript
fetch(
  "https://api.igdb.com/v4/website_types",
  { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: "fields checksum,created_at,type,updated_at;"
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/website_types")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Accept", "application/json")
  .body("fields checksum,created_at,type,updated_at;")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/website_types".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token", "Accept" to "application/json")
  .body("fields checksum,created_at,type,updated_at;").responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/website_types")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpBody = "fields checksum,created_at,type,updated_at;".data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/json", forHTTPHeaderField: "Accept")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/website_types'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
request.body = 'fields checksum,created_at,type,updated_at;'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/website_types', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'},'data': 'fields checksum,created_at,type,updated_at;'})
print ("response: %s" % str(response.json()))

```

A website type, usually the name of the website

### Request Path

`https://api.igdb.com/v4/website_types`

| field       | type     | description                                               |
| ----------- | -------- | --------------------------------------------------------- |
| checksum    | uuid     | Hash of the object                                        |
| created\_at | datetime | Date this was initially added to the IGDB database        |
| type        | String   | The website type                                          |
| updated\_at | datetime | The last date this entry was updated in the IGDB database |

# PopScore

## Introducing IGDB PopScore - Your key to tracking the latest trends in the video game market.

Accessible through our API, IGDB PopScore offers “popularity primitives” from sources like IGDB page visits and list additions, with more sources and primitives coming in the future.

With IGDB PopScore, you can define and create your own trend and popularity indicators using individual primitives or by combining them to fit your needs. Updated every 24 hours, our data ensures you always have the latest insights into the gaming market covering all platforms. Stay ahead of the curve, uncover emerging trends, and improve your data-driven decisions by checking out IGDB PopScore today

## Currently available PopScore primitives

1. **IGDB Visits**: Game page visits on IGDB.com.
2. **“IGDB Want to Play”**: Additions to IGDB.com users’ “Want to Play” lists.
3. **“IGDB Playing”**: Additions to IGDB.com users’ “Playing” lists.
4. **“IGDB Played”**: Additions to IGDB.com users’ “Played” lists.
5. **“Steam 24hr Peak Players”**: Peak CCU over the past 24 hours.
6. **“Steam Postitive Reviews”**: Total number of positive reviews
7. **“Steam Negative Reviews”**: Total number of negative reviews.
8. **“Steam Total Reviews”**: Total number of reviews (positive and negative).

We’re constantly refining and expanding IGDB PopScore to ensure you have access to the most up-to-date and relevant data as possible. Stay tuned for exciting new features and data points as we continue to push the boundaries of what’s possible in the realm of video game trend analysis.

You can check the current popularity types we support. to do so feel free to query the api /popularity-types. More details can be found under [Popularity Types](#popularity-type)

## How to use Popularity API

Start by discovering the available popularity types mentioned above

```bash
curl 'https://api.igdb.com/v4/popularity_types' \
-d 'fields name,popularity_source,updated_at; sort id asc;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

Result:

```json
[
	{
		"id": 1,
		"popularity_source": 121,
		"name": "Visits",
	},
	{
		"id": 2,
		"popularity_source": 121,
		"name": "Want to Play",
	},
	{
		"id": 3,
		"popularity_source": 121,
		"name": "Playing",
	},
	{
		"id": 4,
		"popularity_source": 121,
		"name": "Played",
	},
	{
		"id": 5,
		"popularity_source": 1,
		"name": "24hr Peak Players",
	},
	{
		"id": 6,
		"popularity_source": 1,
		"name": "Postitive Reviews",
	},
	{
		"id": 7,
		"popularity_source": 1,
		"name": "Negative Reviews",
	},
	{
		"id": 8,
		"popularity_source": 1,
		"name": "Total Reviews",
	}
]

```

Below you can find some example use case of how you can use popularity primitives

### Use case 1:

As an API user I’d like to fetch the top 10 games based on IGDB visits.

Query:

```bash
curl 'https://api.igdb.com/v4/popularity_primitives' \
-d 'fields game_id,value,popularity_type; sort value desc; limit 10; where popularity_type = 1;' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Accept: application/json'

```

Result:

```json
[
  {
    "id": 15456,
    "game_id": 121,
    "popularity_type": 1,
    "value": 0.006605335786569
  },
  {
    "id": 16211,
    "game_id": 1244,
    "popularity_type": 1,
    "value": 0.005482980680773
  },
...
  {
    "id": 33353,
    "game_id": 135400,
    "popularity_type": 1,
    "value": 0.002741490340386
  },
  {
    "id": 17317,
    "game_id": 3277,
    "popularity_type": 1,
    "value": 0.002695492180313
  }
]

```

In the preview of the result above you can see that the top game is the game with IGDB ID 121.<https://www.igdb.com/games/minecraft> \# ID 121

### Use case 2:

Define your own trend metrics. For example, by combining two or more primitives with equal or different weight ratios, you can create a unique popularity metric and ensure it fits your needs.

In our use case here we want to combine “Want to play” with a weight of 0.6 and “Playing” with a remaining weight of 0.4.

For each game we would need to calculate this in a matter of: 0.6 \* (“Want to play” -> value) + 0.4 \* (“Playing” -> value) = custom\_popularity\_value

To do that you would have to pull the values for each popularity type in your own system and then combine them accordingly.

To pull the date you’ll need locally a data structure similar to the existing popularity primitive where it will have the attributes.

game\_id, popularity\_type, value The Want to Play maps to the popularity\_type = 2 while Playing = 3

An example SQL query that would give you the top 100 of your custom\_popularity would be

```sql
SELECT igdb_game_id,
       SUM(CASE WHEN popularity_type_id = '2' THEN value ELSE 0 END) AS value1,
       SUM(CASE WHEN popularity_type_id = '3' THEN value ELSE 0 END) AS value2,
       (
           0.6 * SUM(CASE WHEN popularity_type_id = '2' THEN value ELSE 0 END) +
           0.4 * SUM(CASE WHEN popularity_type_id = '3' THEN value ELSE 0 END)
           )  AS weighted_score
FROM popularity_primitives
GROUP BY igdb_game_id
ORDER BY weighted_score DESC LIMIT 10;

```

You can find detailed API documentation under [Popularity Types](#popularity-type) and [Popularity Primitives](#popularity-primitive)

# Webhooks

### What?

Webhooks allow us to push data to you when it is added, updated, or deleted. Instead of polling the API for changes, you can listen on your own HTTP endpoint (Webhook) and we will deliver the data to you.

Using Webhooks will ensure that your data is always up to date!

```shell
curl -X POST 'https://api.igdb.com/v4/ENDPOINT/webhooks/' \
-d 'url=YOUR_WEBHOOK_URL&secret=YOUR_WEBHOOK_SECRET&method=create' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token' \
-H 'Content-Type: application/x-www-form-urlencoded'

```

```javascript
fetch( "https://api.igdb.com/v4/ENDPOINT/webhooks/",
  { method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    },
    body: new URLSearchParams({
      'url': 'YOUR_WEBHOOK_URL',
      'secret': 'YOUR_WEBHOOK_SECRET',
      'method': 'create'
    })
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/ENDPOINT/webhooks/")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .header("Content-Type", "application/x-www-form-urlencoded")
  .field("url", "YOUR_WEBHOOK_URL")
  .field("secret", "YOUR_WEBHOOK_SECRET")
  .field("method", "create")
  .asJson();

```

```kotlin
val webhookURL = "https://api.igdb.com/v4/ENDPOINT/webhooks/"
val webhookParams = listOf("url" to "YOUR_WEBHOOK_URL", "secret" to "YOUR_WEBHOOK_SECRET", "method" to "create")
val (request, response, result) = webhookURL.httpPost(webhookParams).header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token").responseString()
when (response.statusCode) {
      200  -> Logger.info("New webhook registered!")
      409  -> Logger.warning("Webhook already exists, already connected.. ")
      else -> Logger.error("Received unknown error, code: ${response.statusCode}")
}

```

```swift
let url = URL(string: "https://api.igdb.com/v4/ENDPOINT/webhooks/")!
var requestHeader = URLRequest.init(url: url as! URL)
let parameters = "url=YOUR_WEBHOOK_URL&secret=YOUR_WEBHOOK_SECRET&method=create"
requestHeader.httpBody = parameters.data(using: .utf8, allowLossyConversion: false)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
requestHeader.setValue("application/x-www-form-urlencoded", forHTTPHeaderField: "Content-Type")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4', 443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/ENDPOINT/webhooks/'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token', 'Content-Type' => 'application/x-www-form-urlencoded'})
request.body = 'url=YOUR_WEBHOOK_URL&secret=YOUR_WEBHOOK_SECRET&method=create'
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/ENDPOINT/webhooks/', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token', 'Content-Type': 'application/x-www-form-urlencoded'}, 'data': 'url=YOUR_WEBHOOK_URL&secret=YOUR_WEBHOOK_SECRET&method=create'})
print ("response: %s" % str(response.json()))

```

### How to register your webhook

To register a new webhook you need to send a `POST` request to `ENDPOINT/webhooks`. The endpoint is required as it specifies what type of data you want from your webhook.

The post request should contain `x-www-form-urlencoded` body with three parameters:

* `url` this is your prepared url that is ready to accept data from us.
* `method` this is the type of data you are expecting to your url, there are three types of methods  
   * `create`, sends new items from the API  
   * `delete`, sends deleted items from the API  
   * `update`, sends updated items from the API
* `secret` this is your “secret” password for your webhook. Every request from the webhook service will have your secret in the header called `X-Secret`.

```yaml
// Example response upon registering your webhook
{ 
    "id": WEBHOOK_ID, // A unique ID for the webhook
    "url": "YOUR_WEBHOOK_URL", // Your chosen URL
    "category": 1, // Based on the endpoint you chose
    "sub_category": 0, // Based on your method (can be 0, 1, 2)
    "active": true, // Is the webhook currently active
    "api_key": "YOUR_CLIENT_ID", // Displays the api key the webhook is connected to
    "secret": "YOUR_SECRET", // Your chosen secret
    "created_at": "2018-11-25T23:00:00.000Z", // Created at date
    "updated_at": "2018-11-25T23:00:00.000Z" // Updated at date
}

```

  
Registering your webhook in Postman Once your webhook is registered you will receive a response with the new webhook object

```yaml
// Delete Response from Webhook
{
  "id": "1234"
}

```

That’s it!  
The data will now be sent to your webhook in the body of a post request. The data is a single json object representing an **unexpanded entity**.  
Webhooks from **DELETE** do not send the entire object but only the **ID**.

**Tip!** Always validate your received data with you secret! 

Webhooks have an `active` field, as you can see in the JSON response above, The service will keep the webhook active as long as the webhook url is capable of receiving data from the service. If the url fails **5** times the webhook will be set to inactive (`active: false`) and the service will stop to send data to this webhook.

Reactivating the webhook is done by re-registering it, this will update the `active` status to true.

**Tip!** Re-register your webhook on service start, to make sure it's always active! 

```shell
# Get ALL registered Webhooks
curl 'https://api.igdb.com/v4/webhooks/' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token'

```

```javascript
// Get ALL registered Webhooks
fetch(
  "https://api.igdb.com/v4/webhooks/",
  {
    method: 'GET',
    headers: {
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    }
  }).then(response => {
    console.log(response.json());
  }).catch(err => {
    console.error(err);
  }
);

```

```java
// Get ALL registered Webhooks
HttpResponse<JsonNode> jsonResponse = Unirest.get("https://api.igdb.com/v4/webhooks/")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .asJson();

```

```kotlin
// Get ALL registered Webhooks
val (request, response, result) = "https://api.igdb.com/v4/webhooks/".httpGet()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token")
  .responseString()

```

```swift
// Get ALL registered Webhooks
let url = URL(string: "https://api.igdb.com/v4/webhooks/")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpMethod = "GET"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
# Get ALL registered Webhooks
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Get.new(URI('https://api.igdb.com/v4/webhooks/'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
puts http.request(request).body

```

```python
# Get ALL registered Webhooks
from requests import post
response = get('https://api.igdb.com/v4/webhooks/', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'}})
print ("response: %s" % str(response.json()))

```

### Viewing your webhooks

You can always get information about your webhooks from the API. To get ALL of your registered webhooks simply send a `GET` request to `/webhooks`, without the endpoint. This will return a JSON array of your webhooks

To get information about a specific webhook you can make a `GET` request with the webhook id to `/webhooks/WEBHOOK_ID`, without the endpoint. This will return the webhook of that id.

```shell
curl -X DELETE 'https://api.igdb.com/v4/webhooks/WEBHOOK_ID' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token'

```

```javascript
fetch(
  "https://api.igdb.com/v4/webhooks/WEBHOOK_ID",
  {
    method: 'DELETE',
    headers: {
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token',
    }
  }).then(response => {
    console.log(response.json());
  }).catch(err => {
    console.error(err);
  }
);

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.delete("https://api.igdb.com/v4/webhooks/WEBHOOK_ID")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/webhooks/WEBHOOK_ID".httpDelete()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token")
  .responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/webhooks/WEBHOOK_ID")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpMethod = "DELETE"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4',443)
http.use_ssl = true
request = Net::HTTP::Delete.new(URI('https://api.igdb.com/v4/webhooks/WEBHOOK_ID'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
puts http.request(request).body

```

```python
from requests import post
response = delete('https://api.igdb.com/v4/webhooks/WEBHOOK_ID', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'}})
print ("response: %s" % str(response.json()))

```

### Removing a Webhook

To remove your existing webhook you need to send a `DELETE` request to `/webhooks/WEBHOOK_ID`, without the endpoint. The Webhook id is returned during the registration process or can be found with a `GET` request to `/webhooks/`.

The `DELETE` request will receive the deleted webhook as confirmation.

```shell
curl -X POST 'https://api.igdb.com/v4/ENDPOINT/webhooks/test/WEBHOOK_ID?entityId=ENTITY_ID' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token'

```

```javascript
fetch( "https://api.igdb.com/v4/ENDPOINT/webhooks/test/WEBHOOK_ID?entityId=ENTITY_ID",
  { method: 'POST',
    headers: {
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token'
    })
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.igdb.com/v4/ENDPOINT/webhooks/test/WEBHOOK_ID?entityId=ENTITY_ID")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/ENDPOINT/webhooks/test/WEBHOOK_ID?entityId=ENTITY_ID".httpPost()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token")
  .responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/ENDPOINT/webhooks/test/WEBHOOK_ID?entityId=ENTITY_ID")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpMethod = "POST"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4', 443)
http.use_ssl = true
request = Net::HTTP::Post.new(URI('https://api.igdb.com/v4/ENDPOINT/webhooks/test/WEBHOOK_ID?entityId=ENTITY_ID'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
puts http.request(request).body

```

```python
from requests import post
response = post('https://api.igdb.com/v4/ENDPOINT/webhooks/test/WEBHOOK_ID?entityId=ENTITY_ID', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'}})
print ("response: %s" % str(response.json()))

```

### Testing

To make sure you have everything setup just right we have a test endpoint for the webhook service. This endpoint will send an object of your choosing to your newly created webhook.

Send a `POST` request to `ENDPOINT/webhooks/test/WEBHOOK_ID?entityId=ENTITY_ID`. The entity id is the id of the object from the endpoint you wish to test with, example:

`POST` to `games/webhooks/test/42?entityId=1337`:  
This request will send the game object with id 1337 to your webhook url.

### Handling Webhooks on your end

When recieveing the webhook message on your end what we expect is to recieve a `200 OK` back within **15 seconds**. If the endpoint takes longer than 15 seconds to respond the event will be deemed as a failed event, fail 5 times and the webhook will be set to inactive.

# CORS Proxy

## CORS

If you intend to use our API from your website you will encounter an issue with security; namely CORS [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

There are security mechanisms in place by all major browsers to stop websites from accessing other domains without getting explicit permission. This is done through HTTP headers. So, for example, amazinggameswebsite.com cannot access api.igdb.com without us explicitly stating in the HTTP headers (Access-Control-Allow-Origin) that they have permission.

We do not offer the configuration of these headers as a service, so any browser-based javascript and mobile javascript frameworks will not be able to communicate directly with the IGDB API.

### Workaround

See the guide for [setting up a proxy](#proxy) or set up a proxy using [CORS Anywhere](https://github.com/Rob--W/cors-anywhere)

## Proxy

There are a number of reasons why you may wish to proxy requests to the IGDB API.

* To have a backend that keeps track of your Oauth Application Tokens
* Caching requests to the API for better performance
* Enable application logging to track/debug usage
* Enable CORS between the proxy and applications

### How do I set up a proxy?

Proxies can be complex, but to get you started we have a simple guide to get you up and running quickly through AWS.

We have provided a single link that will let you deploy an AWS Api Gateway in your own AWS account that will serve as a proxy. This Stack will also handle your Access Token rotations automatically for you, so you don’t need to think about that.



### What will it cost?

AWS has a [very generous free-tier](https://aws.amazon.com/api-gateway/pricing/) for new users and the services used in the provided solution ([Api Gateway](https://aws.amazon.com/api-gateway/pricing/), [Secrets Manager](https://aws.amazon.com/secretsmanager/pricing/), [Lambda](https://aws.amazon.com/lambda/pricing/)). Please use the [AWS Pricing Calculator](https://calculator.aws/#/estimate) to gauge how much this will cost you before setting up your Stack.

### Stack Setup

**Prerequisites:** You need to have an AWS account with permissions to deploy CloudFormation stacks.

1. Click this [link](https://console.aws.amazon.com/cloudformation/home?region=us-west-2#/stacks/create/review?stackName=simple-igdb-proxy&templateURL=https://api-simple-proxy-bucket.s3.amazonaws.com/api-simple-proxy.yml) to get started.
2. Go over the Stack Details  
   * You have to agree to the terms and conditions.  
   * You have to fill in your [Twitch Application Credentials](https://dev.twitch.tv/)  
   * It’s recommended to protect your proxy by enabling Api Keys  
   * **NOTE:** Enabling Caching will come with extra costs as this is NOT covered by the Free-tier  
   * **NOTE:** Enabling CORS will ‘break’ Protobuf responses, some libraries might not work.
3. Click Next
4. Configure Stack Options - Nothing is required here, you can click Next
5. Verify Settings, click the checkbox at the bottom, then click “Create Stack”
6. You will now see the “Stack Details” screen, hit the refresh arrow button on the right until your stack name on the left says “UPDATE\_COMPLETE”
7. Click on the “Outputs” tab to get the URL to your new proxy.  
   * The “Resources” tab summarises all the services deployed on your account.  
   * The “Template” tab displays the template used for deployment.
8. You can now post requests to your URL and it will proxy to our API  
   * If you enabled Api Keys you will need to specify the header `x-api-key` and the key can be found via a link through the “Resources” tab for “ApiDefaultKey”

**Important Note:** The url generated will end in `production`, so you will want to post to  
`​​https://<your-api-gateway-unique-id>.execute-api.us-west-2.amazonaws.com/production/v4/games`



### What’s next?

You can do a lot of things via [API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/getting-started.html).

* You can improve the security of your proxy by creating another sort of [Authentication](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-integrate-with-cognito.html), to prevent others from using up your RPS quota.
* You can also setup your own Domain name and SSL with [Route53](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-custom-domains.html)
* You can modify the path of the proxy to have it serve as the front-end to your own APIs  
   * Perform a calculation? [Lambda Integration](https://docs.aws.amazon.com/apigateway/latest/developerguide/getting-started-with-lambda-integration.html)  
   * Just want to store some records? [DynamoDB Integration](https://aws.amazon.com/blogs/compute/using-amazon-api-gateway-as-a-proxy-for-dynamodb/)  
   * Want users to be able to upload/download files? [S3 Integration](https://docs.aws.amazon.com/apigateway/latest/developerguide/integrating-api-with-aws-services-s3.html)
* Enable request [logging](https://docs.aws.amazon.com/apigateway/latest/developerguide/security-monitoring.html)

### Alternatives

* CORS: Setup a proxy using [CORS Anywhere](https://github.com/Rob--W/cors-anywhere)

# Reference

## Images

**Note:** Images that are removed or replaced from IGDB.com exist for **30 days** before they are removed. Keep that in mind when designing cache logic.

### Examples

* Address:  
   * `https://api.igdb.com/v4/games/`
* Body:  
   * `fields screenshots.*;  
   where id = 1942;`

Here we retrieve the image properties of the game with the id “1942”

```json
[{
	"id": 1942,
	"screenshots": [{
			"id": 9742,
			"game": 1942,
			"height": 1080,
			"image_id": "mnljdjtrh44x4snmierh",
			"url": "//images.igdb.com/igdb/image/upload/t_thumb/mnljdjtrh44x4snmierh.jpg",
			"width": 1920
		},
		{
			"id": 9743,
			"game": 1942,
			"height": 1080,
			"image_id": "em1y2ugcwy2myuhvb9db",
			"url": "//images.igdb.com/igdb/image/upload/t_thumb/em1y2ugcwy2myuhvb9db.jpg",
			"width": 1920
		}
	]
}]

```

**Response example on the right –>**

**Image url structure:**

`https://images.igdb.com/igdb/image/upload/t_screenshot_med_2x/dfgkfivjrhcksyymh9vw.jpg`

**Break down:**

`https://images.igdb.com/igdb/image/upload/t_{size}/{hash}.jpg`

`size` is one of the interchangeable size types listed below.`hash` is the id of the image. The image sizes are all maximum size but by appending `_2x` to any size, you can get retina (DPR 2.0) sizes (`cover_small_2x`).

| Name             | Size        | Extra                 |
| ---------------- | ----------- | --------------------- |
| cover\_small     | 90 x 128    | Fit                   |
| screenshot\_med  | 569 x 320   | Lfill, Center gravity |
| cover\_big       | 264 x 374   | Fit                   |
| logo\_med        | 284 x 160   | Fit                   |
| screenshot\_big  | 889 x 500   | Lfill, Center gravity |
| screenshot\_huge | 1280 x 720  | Lfill, Center gravity |
| thumb            | 90 x 90     | Thumb, Center gravity |
| micro            | 35 x 35     | Thumb, Center gravity |
| 720p             | 1280 x 720  | Fit, Center gravity   |
| 1080p            | 1920 x 1080 | Fit, Center gravity   |

## Fields

### What?

Fields are properties of an entity. For example, a Game field would be `genres` or `release_dates`. Some fields have properties of their own, for example, the `genres` field has the property `name`.

### Where?

Fields can be used on any entity that has sub-properties such as Games, Companies, People etc.

### How?

Fields are requested in a comma separated list. For example, to get some information for some Games, Genres, Themes or anything else, you could request it like this:

**Apicalypse**

`where id = (4356,189,444);`  
`fields name,release_dates,genres.name,rating`

**Legacy Parameters**

`/games/4356,189,444?fields=name,release_dates,genres.name,rating`

Note in Apicalypse the `name` property of `genres` can be accessed directly with a dot (genres.name).

A full list of fields can be obtained by passing a `*` as a field. Alternatively you can use the `meta` postfix: `/games/meta` to get a list of all fields.

### Shorthand

Another way of writing fields is to use the shorthand **f** which achieves the same result.

`f name,release_dates,genres.name,rating;`  
`w id = (4356,189,444);`

## Exclude

### What?

Exclude is a complement to the regular fields which allows you to request all fields with the exception of any numbers of fields specified with exclude.

### How?

Fields to be excluded are specified as a comma separated list. For example, to get all fields excpect for screenshots, you could request it like this:

**Apicalypse**

`fields *;`  
`exclude screenshots;`

### Shorthand

Another way of writing exclude is to use the shorthand **x** which achieves the same result.

`f *;`  
`x screenshots;`

## Expander

### What?

Some fields are actually ids pointing to another endpoint. The expander feature is a convenient way to go into these other endpoints and access more information from them in the same query, instead of having to do multiple queries.

### Where?

Expands are specificed among the regular fields in the body of the query.

### How?

Fields can be expanded with a dot followed by the fields you want to access from a certain endpoint.

### Examples

In the example below we request the fields name and genres for the game The Witcher 3 with id 1942.

`fields name,genres;`  
`where id = 1942;`

But this query will only return ids for the genres, which can be seen in the first response to the right:

```json
"First example response showing genre ids"
[
    {
        "id ": 1942,
        "genres":[
            12,
            31
        ],
        "name": "The Witcher 3: Wild Hunt"
    }
]

```

For some use cases the id is all that is needed, but other times more data is needed, This is when the expander features comes in handy.

`fields name,genres.name;`  
`where id = 1942;`

This example with expander retrieves the name of each genre which can be seen in the second response to the right.

```json
"Second example response showing genre ids and name"
[
    {
        "id": 1942,
        "genres": [
            {
                "id": 12,
                "name": "Role-playing (RPG)"
            },
            {
                "id": 31,
                "name": "Adventure"
            }
        ],
        "name": "The Witcher 3: Wild Hunt"
    }
]

```

And lastly lets take a look at how you can use a wildcard character **\*** to retrieve all data from genres in the previous example.

`fields name,genres.*;`  
`where id = 1942;`

See the third response to the right where all available data for each genre is included in the response.

```json
"Third example response showing all available genre data"
[
    {
        "id": 1942,
        "genres": [
            {
                "id": 12,
                "created_at": 1297555200,
                "name": "Role-playing (RPG)",
                "slug": "role-playing-rpg",
                "updated_at": 1323216000,
                "url": "https://www.igdb.com/genres/role-playing-rpg"
            },
            {
                "id": 31,
                "created_at": 1323561600,
                "name": "Adventure",
                "slug": "adventure",
                "updated_at": 1323561600,
                "url": "https://www.igdb.com/genres/adventure"
            }
        ],
        "name": "The Witcher 3: Wild Hunt"
    }
]

```

## Filters

### What?

Filters are used to sift through results to get what you want. You can exclude and include results based on their properties. For example you could remove all Games where the `rating` was below 80 (`where rating >= 80`).

### How?

Filters are parameter arrays so must be added using special keys like this:

* Address:  
   * `https://api.igdb.com/v4/games/`
* Body:  
   * `search “zelda”;  
   where rating >= 80 & release_dates.date > 631152000;`

### Where?

Filters can be used on any entity that has sub-properties such as Games, Companies, People etc.

### Available Postfixes

* `=` Equal: Exact match equal.
* `!=` Not Equal: Exact match equal.
* `>` Greater than (works only on numbers).
* `>=` Greater than or equal to (works only on numbers).
* `<` Less than (works only on numbers).
* `<=` Less than or equal to (works only on numbers).
* `= "Your input string"*` Prefix: Exact match on the beginning of the string, can end with anything. (Case sensitive).
* `~ "Your input string"*` Prefix: Exact match on the beginning of the string, can end with anything. (Case insensitive).
* `= *"Your input string"` Postfix: Exact match at the end of the string, can start with anything. (Case sensitive).
* `~ *"Your input string"` Postfix: Exact match at the end of the string, can start with anything. (Case insensitive).
* `= *"Your input string"*` Infix Exact match in the middle of the string, can start and end with anything. (Case sensitive).
* `~ *"Your input string"*` Infix Exact match in the middle of the string, can start and end with anything. (Case insensitive).
* `!= null` The value is not null.
* `= null` The value is null.
* `[V1,V2,...Vn]` The value exists within the (comma separated) array (AND between values).
* `![V1,V2,...Vn]` The values must not exist within the (comma separated) array (AND between values).
* `(V1,V2,...Vn)` The value has any within the (comma separated) array (OR between values).
* `!(V1,V2,...Vn)` The values must not exist within the (comma separated) array (OR between values).
* `{V1,V2,...V2}` Exact match on arrays. (Does not work on ids, strings, etc).

### Examples

**Filter by multiple platforms**

To get games that are released on PS4 OR XBOX ONE OR PC

* Address:  
   * `https://api.igdb.com/v4/games/`
* Body:  
   * `fields name;  
   where release_dates.platform = (48,49,6);`

Similarly if you want games released on PS4 AND XBOX ONE AND PC

* Address:  
   * `https://api.igdb.com/v4/games/`
* Body:  
   * `fields name;  
   where release_dates.platform = [48,49,6];`

If you want games released only on PC

* Address:  
   * `https://api.igdb.com/v4/games/`
* Body:  
   * `fields name;  
   where release_dates.platform = 6;`

And if you want games released for PC OR any other platform

* Address:  
   * `https://api.igdb.com/v4/games/`
* Body:  
   * `fields name;  
   where release_dates.platform = (6);`

### Combining Multiple Filters

It is possible to to use logical operators between filters, which could look something like this:

* Address:  
   * `https://api.igdb.com/v4/games/`
* Body:  
   * `fields name,platforms,genres.name;  
   where (platforms = [6,48] & genres = 13) | (platforms = [130,48] & genres = 12);`

The response from this example query will be games that fulfil one or both of two sets or requirements:

* Games released for for both PC (6), and PS4 (48) and also has the genre simulator (13).
* Games released for for both Switch (130), and PS4 (48) and also has the genre Role-Playing (13).

### Prefix, Postfix and Infix

**Prefix**

Filtering for game names beginning with “Super” (this will return games such as for example Super Mario World)

* Address:  
   * `https://api.igdb.com/v4/games/`
* Body:  
   * `fields name;  
   where name = "Super"*;`

**Postfix**

Filtering for game names ending with with “World” (this will also return games such as for example Super Mario World)

* Address:  
   * `https://api.igdb.com/v4/games/`
* Body:  
   * `fields name;  
   where name = *"World";`

**Infix**

Filtering for game names containing the string “Smash” anywhere (this will return games such as for example Super Smash Bros)

* Address:  
   * `https://api.igdb.com/v4/games/`
* Body:  
   * `fields name;  
   where name = *"Smash"*;`

**case insensitive version**

Filtering for game names containing the string “Smash” (this will return games such as for example Super Smash Bros)

* Address:  
   * `https://api.igdb.com/v4/games/`
* Body:  
   * `fields name;  
   where name ~ *"Smash"*;`

### Removing erotic games from API responses

Some queries may return games with erotic themes. All erotic games in the database has the theme ’erotic’ (id = 42). So by adding a simple filter like the one below you can remove them from your responses.

* Address:  
   * `https://api.igdb.com/v4/games/`
* Body:  
   * `fields name;  
   where themes != (42);`

## Sorting

### What?

Sorting is used to order results by a specific field.

### How?

You can order results like this:

* Address:  
   * `https://api.igdb.com/v4/games/`
* Body:  
   * `sort release_dates.date desc;  
   where rating >= 80;  
   `

Notice the appended `:desc` (descending) which could also be `:asc` (ascending) if required.

**Order by rating**

Rating parameter for games. You can access it like this:

* Address:  
   * ` https://api.igdb.com/v4/games/`
* Body:  
   * `fields name,rating;  
   sort rating desc;  
   where rating != null;`

### Where?

Ordering can be used on any entity.

## Search

### What?

Search based on name, results are sorted by similarity to the given search string.

### Where?

Searchable endpoints:

* Characters
* Collections
* Games
* People
* Platforms
* Themes

### How?

You specify which endpoint to search through in the Address field of your request. The search string is then entered in the body of the request by typing `search`, blank space followed by the string you wish to search for.

* Address:  
   * `https://api.igdb.com/v4/games/`
* Body:  
   * `search “zelda”;`

## Pagination

Here is an example for how to use **limit**. The default limit is 10\. The maximum value you can set for limit is 500.

* Address:  
   * `https://api.igdb.com/v4/platforms/`
* Body:  
   * `limit 33;`

There is also an **offset**. This will start the list at position 22 and give 33 results.

* Address:  
   * `https://api.igdb.com/v4/platforms/`
* Body:  
   * `limit 33;  
   offset 22;`

## Protocol Buffers

[Google Protocol Buffers](https://developers.google.com/protocol-buffers) is a language neutral method for serializing structured data.  
The IGDB API supports responses in this format so you do not have to write your own serialization libraries, but instead you could just generate one.  
Since this is langage neutral it is supported by a variatey of languages.

### How?

Generate the objects in your language of choise with our own Protobuf file, [here](https://api.igdb.com/v4/igdbapi.proto)  
This file contains the mapping of the entire IGDB API and can be used to generate wrappers, code and tooling in any programming language.  
The protobuf file is created in accordance with the [proto3 specification](https://developers.google.com/protocol-buffers/docs/proto3)

There are plenty of examples on how to do this Online and on the [Protobuf Site](https://developers.google.com/protocol-buffers/docs/tutorials).

### Where?

To start recieving protobuf compatible responses from then api all you need to do is add `.pb` at the end of your request:  
`https://api.igdb.com/v4/games.pb`  
Then use your generated files to parse the response into the expected object.

## Tag Numbers

Tag numbers are automatically generated numbers which provide a compact and fast way to do complex filtering on the IGDB API. The number calculation can be easily achieved with any programming language.

The basis of the calculation is a 32bit integer, where the first 4 bits contain the object type ID, and the remaining 28 bits represent the ID of the object we are generating the tag number for.

Using this method a flat index of custom object ‘hashes’ can be maintained in which index the search and filtering is faster than using conventional methods.

Currently the following object types use tags:

| Type ID | Name               |
| ------- | ------------------ |
| 0       | Theme              |
| 1       | Genre              |
| 2       | Keyword            |
| 3       | Game               |
| 4       | Player Perspective |

Let’s see two examples for tag number calculation.

```js
// Javascript
const genreTypeID = 1; // The type ID from the table above
const shooterGenreID = 5; // The Shooter genre's ID, coming from the genres endpoint.
let tagNumber = genreTypeID << 28; // Bit-shifting the genre's type ID by 28 bits, ensuring that it will get into the first four bits. The result will be 268435456
tagNumber |= shooterGenreID; // Adding the Shooter genre ID to the tag number with a bitwise OR operation. The result will be 268435461.

```

We try to find all the games which relate to the Shooter genre. The tag number generation in Javascript would look something like the example on the right.

Javascript example query:

* Address:  
   * `https://api.igdb.com/v4/games/`
* Body:  
   * `where tags = (268435461);  
   `

```python
# Python
keywordTypeID: 2 # The keyword's type ID from the table above/
keywordID: 148 # The ID of the 'moba' keyword
tagNumber: keywordTypeID << 28 # Bit-shifting the keywords's type ID by 28 bits, ensuring that it will get into the first four bits. The result will be 536870912
tagNumber |= keywordID # Adding the keyword ID to the tag number with a bitwise OR operation. The result will be 536871060.

```

Python example query:

* Address:  
   * `https://api.igdb.com/v4/games/`
* Body:  
   * `where tags = (536871060);  
   `

## Multi-Query

Multi-Query is a new way to request a huge amount of information in one request! With Multi-Query you can request multiple endpoints at once, it also works with multiple requests to a single endpoint as well.

A Multi-Query is made by making a `POST` request to: `https://api.igdb.com/v4/multiquery`.

**Syntax Structure**The Multi-Query syntax is made up of three pieces; “Endpoint name”, “Result Name (Given by you)”, and the APICalypse query inside the body {}.

**important**You can only run a maximum of 10 queries.

### Example 1:

Get the count of platforms in the api.

```
query platforms/count "Count of Platforms" {
  // here we can have additional filters
};

```

This above query will give us the following result:

```json
[
  {
    "name": "Count of Platforms",
    "count": 155
  }
]

```

### Example 2:

Get Playstation 4 Exclusives

```
query games "Playstation Games" {
	fields name,platforms.name;
	where platforms !=n & platforms = {48};
	limit 1;
};

```

This above query will give us the following result:

```JSON
[
    {
        "name": "Playstation Games",
        "result": [
            {
                "id": 52826,
                "name": "Skate 4",
                "platforms": [
                    {
                        "id": 48,
                        "name": "PlayStation 4"
                    }
                ]
            }
        ]
    }
]

```

### Example 3:

Combining the queries of example 1 and 2.

```
query platforms/count "Count of Platforms" {
  // here we can ahve additional filters
};

query games "Playstation Games" {
	fields name,platforms.name;
	where platforms !=n & platforms = {48};
	limit 1;
};

```

```JSON
[
    {
        "name": "Count of Platforms",
        "count": 155
    },
    {
        "name": "Playstation Games",
        "result": [
            {
                "id": 52826,
                "name": "Skate 4",
                "platforms": [
                    {
                        "id": 48,
                        "name": "PlayStation 4"
                    }
                ]
            }
        ]
    }
]

```

## APICalypse

### APICalypse cheatsheet

APICalypse is a new language used for this api which greatly simplifies how you can query your requests compared to the url parameters used in API V2.

### Fields

Fields are used to select which fields you want back from your request to the api.

To select fields you need the APICalypse command `fields` or its shorthand `f`.

Popular wildcard is to add `*` instead of a field, this will give you all of the fields.

`fields name,release_dates,genres.name,rating;`  
`f name,release_dates,genres.name,rating;`

### Exclude

Commonly used with selecting all fields with the wildcard `*` this command will exclude the fields that you select.

To exclude fields you don’t need the APICalypse command `exclude` or its shorthand `x`.

`fields *;`  
`exclude tags,keywords;`

`f *;`  
`x tags,keywords;`

### Where

Where is easiest described as a filter. With where you can filter on specific fields.

To filter your results use the APICalypse command `where` or its shorthand `w`.

`fields *;`  
`where genres = 4;`

`f *;`  
`w genres = 4;`

### Limit

Limit describes how many results you will get back from the api, the standard value is 10.

To set a new limit use the APICalypse command `limit` or it’s shorthand `l`.

`fields *;`  
`limit 50;`

`f *;`  
`l 50;`

### Offset

Offset describes how many results you will skip over, standard is 0.

To set a new offset use the APICalypse command `offset` or it’s shorthand `o`.  
Offset is often used together with Limit for pagination.

`limit 50;`  
`offset 50;`

`l 50;`  
`o 50;`

### Sort

Use Sort to order the results to your liking.

To order the results use the APICalypse command `sort` or it’s shorthand `s`.  
Sort has two accompaning commands for “direction”; `asc` Ascending order and `desc` Decending order.

`fields *;`  
`sort rating asc;`

`f *;`  
`s rating desc;`

### Search

To find a specific title you can use Search.

To use search use the APICalypse command `search`, it has no shorthand :(. Search has it’s own endpoint where it is good to use a filter for specific kinds of results, example `where game != null;` for only games.

`search "Halo";`  
`fields name;`

`search "Halo";`  
`f name;`

### Other shorts

Null can be written `null` or `n`. Booleans can be written as `true` or `t` and `false` or `f`

# Migration Enums to Tables

## Important Changes Coming to the IGDB API

We’re announcing upcoming changes to the IGDB API that will affect how certain data fields are structured and accessed. These changes are designed to make our gaming database more dynamic and better suited to the evolving gaming industry.

### Key Changes

We’re moving away from using static enum values in our API to using more flexible table-based structures. While this is primarily an internal change, it affects how certain fields are named in our API. To ensure a smooth transition:

* All current enum values will remain the same in the new table structure
* Only the field names are changing, not the values they contain  
   * **NOTE:** Changes are expected for the Age Rating Categories, IDs will not reflect the same enum values here.
* This change will allow us to evolve our data structure more efficiently in the future
* This change will allow you to expand these fields instead of keeping hardcoded enums

## What is Changing?

Several field names are being standardized across our endpoints for better clarity and consistency:

| Endpoint         | Current Field          | New Field              |
| ---------------- | ---------------------- | ---------------------- |
| age\_rating      | category               | organization           |
| age\_rating      | rating                 | rating\_category       |
| character        | gender                 | character\_gender      |
| character        | species                | character\_species     |
| companies        | change\_date\_category | change\_date\_format   |
| companies        | start\_date\_category  | start\_date\_format    |
| company\_website | category               | type                   |
| external\_game   | category               | external\_game\_source |
| external\_game   | media                  | game\_release\_format  |
| platform         | category               | platform\_type         |
| website          | category               | type                   |

Additionally, we’re adding some new fields:

* The `age_rating` endpoint will now use `rating_content_descriptions` instead of `content_descriptions` (replacing age\_rating\_content\_descriptions with age\_rating\_content\_descriptions\_v2)
* The `companies` endpoint will have a `status` field for active,defunct,merged, or renamed.

**New Endpoints replacing enum values**

* age\_rating\_organizations
* age\_rating\_categories
* age\_rating\_content\_descriptions\_v2
* character\_genders
* character\_species
* company\_status
* company\_websites
* date\_formats
* external\_game\_sources
* game\_release\_formats
* game\_status
* game\_types
* platform\_types
* release\_date\_regions
* website\_types

**Datadumps**  
All of these changes will be reflected in the daily data dumps.

## Migration Timeline

* Migration Period: starting on February 18 to August 31 (6 months)
* During this period, both old and new field names will be available
* Monthly reminders will be sent to all API users about the upcoming deprecation
* After the migration period, the old field names will be removed

### How Does This Affect You?

If your application uses any of the fields listed above, you’ll need to update your code to use the new field names within the next 6 months. The current field names will be removed after the migration period ends.

### Migration Recommendations

1. Begin updating your applications to use the new field names as soon as possible
2. Test your applications thoroughly with the new field names
3. Complete all necessary changes before the end of the 6 month migration period
4. Keep an eye on Discord for monthly deprecation reminders

## Questions or Concerns?

If you have any questions about these changes or need assistance with migration, please:

* Review our updated [API documentation](https://api-docs.igdb.com/#getting-started)
* Reach out to our support team
* Join our [discord](https://discord.gg/igdb) community for discussions

We’re committed to making this transition as smooth as possible for all our API users.

# Partnership

Interested about using the API for a commercial project? No problem, we allow commercial usage. Get in touch with us about our partner program!

### How?

To register for a commertial agreement reach out to [partner@igdb.com](mailto:partner@igdb.com)

### Exclusive Features

Automatic data dumps every 24 hours.  
_More features coming soon._

## Data Dumps

All [endpoints](#endpoints) are available as CSV Data Dumps!

Daily updated CSV Data Dumps which can be used to kick start your projects or keep your data up to date (within 24 hours).

_Please note that data dumps are exclusively available to our Data Partners._ 

```shell
curl -X GET 'https://api.igdb.com/v4/dumps' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token'

```

```javascript
fetch( "https://api.igdb.com/v4/dumps",
  { method: 'GET',
    headers: {
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token'
    })
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.get("https://api.igdb.com/v4/dumps")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/dumps".httpGet()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token")
  .responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/dumps")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpMethod = "GET"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4', 443)
http.use_ssl = true
request = Net::HTTP::Get.new(URI('https://api.igdb.com/v4/dumps'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
puts http.request(request).body

```

```python
from requests import post
response = get('https://api.igdb.com/v4/dumps', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'}})
print ("response: %s" % str(response.json()))

```

### Listing dumps

To list the available data dumps make a GET request to `/dumps`.  
This will return a list of available Data Dumps describing the `endpoint`, `file name`, and `updated at`.

```yaml
# Example response from /dumps
[
    {
		"endpoint": "games",
		"file_name": "1234567890_games.csv",
		"updated_at": 1234567890
	}
]

```

```shell
curl -X GET 'https://api.igdb.com/v4/dumps/ENDPOINT' \
-H 'Client-ID: Client ID' \
-H 'Authorization: Bearer access_token'

```

```javascript
fetch( "https://api.igdb.com/v4/dumps/ENDPOINT",
  { method: 'GET',
    headers: {
      'Client-ID': 'Client ID',
      'Authorization': 'Bearer access_token'
    })
})
  .then(response => {
      console.log(response.json());
  })
  .catch(err => {
      console.error(err);
  });

```

```java
HttpResponse<JsonNode> jsonResponse = Unirest.get("https://api.igdb.com/v4/dumps/ENDPOINT")
  .header("Client-ID", "Client ID")
  .header("Authorization", "Bearer access_token")
  .asJson();

```

```kotlin
val (request, response, result) = "https://api.igdb.com/v4/dumps/ENDPOINT".httpGet()
  .header("Client-ID" to "Client ID", "Authorization" to "Bearer access_token")
  .responseString()

```

```swift
let url = URL(string: "https://api.igdb.com/v4/dumps/ENDPOINT")!
var requestHeader = URLRequest.init(url: url as! URL)
requestHeader.httpMethod = "GET"
requestHeader.setValue("Client ID", forHTTPHeaderField: "Client-ID")
requestHeader.setValue("Bearer access_token", forHTTPHeaderField: "Authorization")
URLSession.shared.dataTask(with: requestHeader) { data, response, error in }.resume()

```

```ruby
require 'net/https'
http = Net::HTTP.new('api.igdb.com/v4', 443)
http.use_ssl = true
request = Net::HTTP::Get.new(URI('https://api.igdb.com/v4/dumps/ENDPOINT'), {'Client-ID' => 'Client ID', 'Authorization' => 'Bearer access_token'})
puts http.request(request).body

```

```python
from requests import post
response = get('https://api.igdb.com/v4/dumps/ENDPOINT', **{'headers': {'Client-ID': 'Client ID', 'Authorization': 'Bearer access_token'}})
print ("response: %s" % str(response.json()))

```

### Downloading CSV

To get the download link for the csv files make a GET request to `/dumps/ENDPOINT`The response object will contain the download link for the CSV and the schema version & schema JSON structure of the data.

**S3 Download Url:**  
The download Url is a presigned S3 url that is valid for 5 minutes.

**Schema**  
The `schema_version` and `schema` will reflect the current data structure and data type that the Dump is using.  
The schema version number will change when the `schema` changes, so if you are planning on an automated setup for this you will need to keep this in mind.

```yaml
# Example response from /dumps/games
{
	"s3_url": "S3_DOWNLOAD_URL",
	"endpoint": "games",
	"file_name": "1234567890_games.csv",
	"size_bytes": 123456789,
	"updated_at": 1234567890,
	"schema_version": "1234567890",
	"schema": {
		"id": "LONG",
		"name": "STRING",
		"url": "STRING",
        "franchises": "LONG[]",
        "rating": "DOUBLE",
        "created_at": "TIMESTAMP",
        "checksum": "UUID",
	}
}

```

# FAQ

## Business related FAQ

### 1\. I want to use the API for a commercial project, is it allowed?

Yes, we offer commercial partnerships for users looking to integrate the API in monetized products. From our side, as part of the partnership, we ask for user facing attribution to IGDB.com from products integrating the IGDB API.

For more details on that process, please reach out to [partner@igdb.com](mailto:partner@igdb.com)

### 2\. What is the price of the API?

The API is free for both non-commercial and commercial projects.

### 3\. Am I allowed to store/cache the data locally?

Yes. In fact, we prefer if you store and serve the data to your end users. You remain in control over your user experience, while alleviating pressure on the API itself.

### 4\. Regarding user facing attribution (relating to the commercial partnership), any specific guidelines?

Not really. We expect fair attribution, i.e. attribution that is visible to your users and located in a static location (e.g. not in a change log).

### 5\. What happens with the data retrieved, in the case of partnership termination?

You are allowed to keep all data you retrieve from the API and we will not ask you to remove the data in case of partnership termination.

### 6\. We don’t wish to attribute IGDB.com as part of the partnership. Are there any other way?

Yes. If you have data that we think will complete the overall IGDB data set and you are willing to share that data with us, we can opt for this approach instead. Please be aware, however, that we are only interested in publicly available data that we can re-distribute using this API.

## Technical related FAQ

### 1\. Can I use Twitch User Credentials to access the API?

The IGDB API uses `Application Credentials` to authenticate, you **cannot** use user credentials to authenticate API requests

More information about authentication can be found in the documentation, [here](#authentication)

### 2\. The requested images are in the wrong format!

Requesting images using the API returns a default image url using the `t_thumb` format. To request larger image sizes you should manually create your own image url using the `image_id` and the appropriate image size. example: `https://images.igdb.com/igdb/image/upload/t_{size}/{image_id}.png`

More information about images and image sizes can be found in our documentation, [here](#images)

### 3\. Why am I recieving a CORS error?

The IGDB API does not support browser requests, CORS, for security reasons. This is because the request would leak your access token! We suggest that you create a backend proxy which authenticates and queries the API directly, and can be set up as a trusted connection for your client application.

For more information see our documentation, [here](#proxy)

### 4\. My AccessToken stopped working, why?

Your Access Token is only active for **60 days** and your application can only have **25 active** Access Tokens at one time, going over this limit starts to inactivate older tokens.

### 5\. Why am I only receiving IDs?

An empty request will only yield a list of IDs. To request more information in a single request you should _expand_ your request.  
Ex: `fields *, cover.*;`

More information about expanding requests, [here](#expander)  
More example requests, [here](#examples)

### 6\. Why am I only receiving 10 items, how do I get more?

The default item limit is set to 10\. To edit this limit simply specify the limit in your request.  
Ex: `limit 50;`  
The maximum limit is set to 500 items/request.

Read more about query syntax, [here](#apicalypse-1)

# Support

### Have a question?

If you have any questions about the API we recommend that you [join our Discord](https://discord.gg/igdb), there you can discuss the API with other people working with it as well as the developers of the API and ask questions.

### Reporting a bug

If you would like to report a bug you can do so in Discord or use [Uservoice](https://twitch.uservoice.com/forums/929953-igdb?category%5Fid=389365)

# License

Any code examples or snippets found under [api-docs.igdb.com](https://api-docs.igdb.com/) are made available under the [Twitch Developer Services Agreement](https://www.twitch.tv/p/legal/developer-agreement/) as Program Materials.

[Shell](#) [Javascript](#) [Java/Unirest](#) [Kotlin/Fuel](#) [Swift](#) [Ruby](#) [Python](#) 
# Miitti API v1 reference

Minimalistic event scheduling

## Create event

Method: POST
Endpoint:
```
/event/
```

Body:
```
{
    "name": (String),
    "dates": [(String)]
}
```

## List all events

Method: GET
Endpoint:
```
/event/list
```

## Show event for given id

Method: GET
Endpoint:
```
/event/{id:String}
```

## Add vote to event

Method: POST
Endpoint:
```
/event/{id:String}/vote
```

Body:
```
{
    "name": (String),
    "votes": [String]
}
```

## Show event results for given id

Method: GET
Endpoint:
```
/event/{id:String}/results
```
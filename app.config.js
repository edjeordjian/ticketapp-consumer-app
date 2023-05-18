export default {
    "expo": {
    "name": "TicketApp",
        "slug": "TicketApp",
        "owner": "tdp2-grupo4",
        "version": "1.0.0",
        "orientation": "portrait",
        "icon": "./assets/icon.png",
        "userInterfaceStyle": "light",
        "splash": {
        "image": "./assets/splash.png",
            "resizeMode": "contain",
            "backgroundColor": "#ffffff"
    },
    "updates": {
        "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
        "**/*"
    ],
        "ios": {
        "supportsTablet": true
    },
    "android": {
        "config": {
            "googleMaps": {
                "apiKey": "${GOOGLE_MAPS_API_KEY}"
            }
        },
        "googleServicesFile": process.env.GOOGLE_SERVICES_JSON === undefined ? "./google-services.json" : process.env.GOOGLE_SERVICES_JSON,
            "adaptiveIcon": {
            "foregroundImage": "./assets/adaptive-icon.png",
                "backgroundColor": "#FFFFFF"
        },
        "package": "uba.tdp2",
            "intentFilters": [
            {
                "action": "VIEW",
                "autoVerify": true,
                "data": [
                    {
                        "scheme": "tdp2-mobile",
                        "host": "app",
                        "pathPrefix": "/signup"
                    }
                ],
                "category": [
                    "BROWSABLE",
                    "DEFAULT"
                ]
            }
        ]
    },
    "web": {
        "favicon": "./assets/favicon.png"
    },
    "scheme": "tdp2-mobile",
        "extra": {
        "eas": {
            "projectId": "8aecf97d-0eea-425b-b1ef-fb23b3b05e3d"
        }
    }
}
}

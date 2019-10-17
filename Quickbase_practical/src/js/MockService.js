const POST_URL = 'http://www.mocky.io/v2/566061f21200008e3aabd919';

var FieldService =  {
    getField: function(id) {
        return {
            "label": "Sales region",
            "required": false,
            "choices": [
                "Asia",
                "Australia",
                "Western Europe",
                "North America",
                "Eastern Europe",
                "Latin America",
                "Middle East and Africa"
            ],
            "displayAlpha": true,
            "default": "North America"
        }
    },
    saveField: function (fieldJson) {
        // Add the code here to call the API (or temporarily, just log fieldJson to the console)
        return fetch(`${POST_URL}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fieldJson)
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return response.status;
            }
        });
    }
};

export default FieldService;
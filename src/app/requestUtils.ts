export class RequestUtils
{
    static async doRequest(type: string, controller: string, body: string, callback: Function)
    {
        const url = 'http://localhost:3000/api/' + controller;

        fetch(url, 
        {
            headers:
            {
                'Content-Type': 'application/json'
            },
            method: type,
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(data =>
        {
            callback(data);
        })
        .catch(error => 
        {
            alert('Error: ' + error);
        });
    }

    static async postRequest(controller: string, body: string, callback: Function)
    {
        RequestUtils.doRequest('POST', controller, body, callback);
    }
    
    static async getRequest(controller: string, body: string, callback: Function)
    {
        RequestUtils.doRequest('GET', controller, body, callback);
    }
}
export class RequestUtils
{
    static async postRequest(controller: string, body: string, callback: Function)
    {
        const url = 'http://localhost:3000/api/' + controller;

        fetch(url, 
        {
            headers:
            {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(data =>
        {
            callback(data);
        })
        .catch ( error => 
        {
            alert('Error: ' + error);
        });
    }
}
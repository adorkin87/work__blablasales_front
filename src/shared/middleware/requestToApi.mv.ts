import storeAuth from '../auth';

const mwRequestToApi = async (request: any): Promise<any> => {
    let fetchResult;

    do {
        fetchResult = await request().then((r: any) => r);

        import.meta.env.MODE === 'development' && console.log(fetchResult);

        if (fetchResult?.['error'] === 'Access token has expired!') {
            await storeAuth.checkToken();
        }
    } while (fetchResult['error'] === 'Access token has expired!');

    return fetchResult;
};

export default mwRequestToApi;

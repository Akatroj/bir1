import axios from 'axios';
const url = {
    prod: 'https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc',
    test: 'https://wyszukiwarkaregontest.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc',
};
export async function query(prod, options) {
    const { headers, body } = options;
    const response = await axios.post(prod ? url.prod : url.test, body, {
        headers: {
            'Content-Type': 'application/soap+xml',
            ...headers,
        },
    });
    return response.data;
}

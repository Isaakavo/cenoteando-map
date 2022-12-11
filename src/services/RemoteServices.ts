import CenoteDTO from '../models/CenoteDTO';
import { httpClient } from './HttpClient';
//import router from './router';
//import Store from './store';
import axios, { AxiosError } from 'axios';
//import L from 'leaflet';
//import { ElementCompact, xml2js } from 'xml-js';
export default class RemoteServices {
    // Error

    static async errorMessage(error: AxiosError): Promise<string> {
        if (error.message === 'Network Error') {
            return 'Unable to connect to server';
        } else if (error.message.split(' ')[0] === 'timeout') {
            return 'Request timeout - Server took too long to respond';
        
        } else if (error.message === 'Request failed with status code 403') {
            //await router.push({ path: '/' });
            return 'Unauthorized access or expired token';
        } else {
            console.log(error);
            return 'Unknown Error - Contact admin';
        }
    }

    static async *cenotesGenerator(size?: number): AsyncGenerator<CenoteDTO[]> {
      let page = 0;
      let hasMore = true;
      try {
          while (hasMore) {
              const response = await httpClient.get('/api/cenotes', {
                  params: { size, page },
              });
              yield response.data.content.map((c: CenoteDTO) => new CenoteDTO(c));
              hasMore = !response.data.last;
              page = response.data.number + 1;
          }
      } catch (e) {
          if (axios.isAxiosError(e)) throw Error(await this.errorMessage(e));
          // TODO: Throw custom error
          else throw Error('Unkown error in CenotesGenerator');
      }
  }

    static async getCenote(key: string): Promise<CenoteDTO> {
      return httpClient
          .get('/api/cenotes/' + key)
          .then((response) => {
              return new CenoteDTO(response.data);
          })
          .catch(async (error) => {
              throw Error(await this.errorMessage(error));
          });
  }

}

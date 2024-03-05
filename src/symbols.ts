import { InjectionKey} from 'vue';
import { AxiosInstance } from 'axios';

const httpClient: InjectionKey<AxiosInstance> = Symbol('httpClient');

export default httpClient

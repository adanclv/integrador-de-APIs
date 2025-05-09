import cities from "../mocks/city.list.json"
import {type Cities} from '../types/city'

const useCities = (): Cities => {
    return cities;
} ;

export default useCities;

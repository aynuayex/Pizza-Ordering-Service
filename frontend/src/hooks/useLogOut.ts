import axios from "@/api/axios";
import { AbilityContext } from "@/context/AbilityProvider";
import { createMongoAbility } from "@casl/ability";
import { useContext } from "react";

const useLogOut = () => {

    const ability = useContext(AbilityContext);

    function updateAbility(permissions: string) {
        const { rules } = createMongoAbility(JSON.parse(permissions));
    
        ability.update(rules);
      }

    const logOut = async () => {
        try {

        updateAbility("[]");

            const response = await axios.get('/logout');   
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

  return logOut
}

export default useLogOut
import { createContext } from 'react';
import { createMongoAbility } from '@casl/ability';
import { createContextualCan } from '@casl/react';
// import { AppAbility } from '@/types';

export const AbilityContext = createContext(createMongoAbility([]));
export const Can = createContextualCan(AbilityContext.Consumer);

 export const AbilitiyProvider = ({ children }: { children: React.ReactNode }) => {
    const ability = createMongoAbility([]);
    
    // function updateAbility(permissions: string ) {
    //     const { can, rules } = createMongoAbility(JSON.parse(permissions));
      
    //     ability.update(rules);
    //   }
      
    return (
        <AbilityContext.Provider value={ability}>
          { children }
        </AbilityContext.Provider>
      )
}
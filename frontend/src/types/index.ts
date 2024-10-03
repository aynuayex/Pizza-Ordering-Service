import { Ability } from '@casl/ability';

export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete';
export type Subjects = 'Post' | 'User' | 'all';

export type AppAbility = Ability<[Actions, Subjects]>;

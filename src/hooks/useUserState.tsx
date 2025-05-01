// src/hooks/useUserState.ts
import { useState, useCallback } from 'react';
import service from '../services/User';
import { User } from 'types';
import { useToken } from './useToken';


export function useUserState() {
  const [user, setUser] = useState<User | undefined>();
  const { getUserIdFromToken } = useToken();
  
  const getMyUser = useCallback(
    async () => {
      await service.getUser({ id: getUserIdFromToken().toString(), callback: setUser });
    },
    [setUser]
  );

  return { user, setUser, getMyUser };
}

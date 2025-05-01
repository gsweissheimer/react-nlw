// src/hooks/useUserState.ts
import { useState, useCallback } from 'react';
import service from '../services/User';
import { User } from 'types';

export function useUserState() {
  const [user, setUser] = useState<User | undefined>();
  
  const getUser = useCallback(
    async (params: { id: string }) => {
      await service.getUser({ id: params.id, callback: setUser });
    },
    [setUser]
  );

  return { user, getUser, setUser };
}

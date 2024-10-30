import { useState, useEffect } from 'react';

function useUserRole() {
    const [role, setRole] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user_info');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setRole(parsedUser.role);
        }
    }, []);

    return role;
}

export  {useUserRole};

import { useState, useEffect } from 'react';

function useUserId() {
    const [id, setId] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user_info');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setId(parsedUser._id);
        }
    }, []);

    return id;
}

export  {useUserId};

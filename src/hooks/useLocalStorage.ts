export const useLocalStorage = (key: string) => {
    const setItem = (value: unknown) => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.log(error);
        }
    };

    const getItem = () => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : undefined;
        } catch (error) {
            console.log(error);
        }
    };

    const removeItem = () => {
        try {
            window.localStorage.removeItem(key);
        } catch (error) {
            console.log(error);
        }
    };

    const checkPersistRoot_Todos = () => {
        try {
            const persistedState = localStorage.getItem('persist:root');
            if (persistedState) {
                const {todos, _persist} = JSON.parse(persistedState);
                if (todos) {
                    const todosArray = JSON.parse(todos).list;
                    if (todosArray.length > 0) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        } catch (error) {
            console.log('error:', error);
        }
    };

    return { setItem, getItem, removeItem, checkPersistRoot_Todos };
};
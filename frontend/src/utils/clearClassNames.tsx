const clearClassNames = (domElement: HTMLElement, classNamesArr: string[]) => {
    classNamesArr.forEach((className) => {
        domElement.classList.remove(className);
    });
};

export default clearClassNames;

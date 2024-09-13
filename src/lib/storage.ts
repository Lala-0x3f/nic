const listName = "history"

const addHistory = (input:string,output:string) => { 
    // 从 localStorage 获取列表
    let list = JSON.parse(localStorage.getItem(listName) || "[]");
    // 向列表中添加新项目
    list.push(
        {
            "i":input,
            "o":output
        }
    );
    // 将更新后的列表存回 localStorage
    localStorage.setItem(listName, JSON.stringify(list));
}
  

const getHistory = () => {
    // console.table(localStorage.getItem(listName) || "no history")
    return JSON.parse(localStorage.getItem(listName) || "[]")
}

const delHistory = () => {
    localStorage.setItem(listName, "[]");
}

export { addHistory, getHistory, delHistory }
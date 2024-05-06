import service from "@/service";
import qs from "qs";

export function denglu(data) {
    return service({
        method:'post',
        url:"/login",
        data
    })
}

export function students(params) {
    return service({
        method:'get',
        url:"/students",
        params
    })
}

export function stuDel(id){
    return service({
        method:"delete",
        url:`/students/${id}`
    })
}

export function Info(type,data) {
    data = qs.stringify(data)
    let obj ={
        method: type,
        url:"/info",
        data
    }
    return service(obj)
}


export function getInfo() {
    return service({
        method:'get',
        url:"/info",      
    })
}

// export function infoAdd(data) {
//     data = qs.stringify(data)
//     return service({
//         method:'post',
//         url:"/info",
//         data
//     })
// }

// export function updateInfo(data) {
//     data = qs.stringify(data)
//     return service({
//         method:'put',
//         url:"/info",
//         data
//     })
// }

export function infoDel(id){
    return service({
        method:"delete",
        url:`/info/${id}`
    })
}

export function dataView() {
    return service({
        method:'get',
        url:"/view",      
    })
}
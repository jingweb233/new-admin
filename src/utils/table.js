export function getData(root, url, params) {
    const queryParams = params || {};
    
    root.service.get(url, { params: queryParams })
        .then(res => {
            if (res.data.status === 200) {
                root.tableData = res.data.data
                root.total = res.data.total
            }
        })
        .catch(err => {
            throw err
        })
}

import qs from "qs";
export function changeInfo(root, method, url, form, callback) {
    let data = qs.stringify(form)
    root.service[method](url, data)
        .then(res => {
            if (res.data.status === 200) {
                callback(root, url)
                root.dialogFormVisible = false;               
                root.$refs.form.resetFields();
                root.$message({ type: "success", message: res.data.message });
            }
        })
        .catch(err => {
            throw err
        })
}

export function delData(root, url, id, callfun) {
    root.$confirm('你确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true, 
    }).then(() => {
        root.service.delete(`${url}/${id}`).then(res => {
            if (res.data.status === 200) {
                root.$message({ type: "success", message: res.data.message });
                callfun(root, url); // 调用传入的回调函数，并传递需要的参数
            }
        }).catch(err => {
            // 可以在这里添加错误处理逻辑
            console.error(err);
            throw err; // 可以选择重抛出错误，或者根据需要进行错误处理
        });
    }).catch(() => {
        // 点击取消时的逻辑
        root.$message({ type: "info", message: "已取消删除" });
    });
}

export function getTabledata(root, url, params, arr) {
    // 确保 params 是一个对象，如果未定义则使用空对象
    const queryParams = params || {};
    
    root.service.get(url, { params: queryParams }) // 直接传递 params 对象
    .then(res => {
        if (res.data.status === 200) {
            root.tableData = res.data.data;
            root.total = res.data.total;
            root.tableData.forEach(item => {
                arr.forEach(aItem => {
                    // 转换布尔值为 '是' 或 '否'
                    item[aItem + '_text'] = item[aItem] ? '是' : '否';
                });
            });
            root.loading = false;
        }
    })
    .catch(err => {
        // 考虑添加更详细的错误处理逻辑
        console.error(err); // 记录错误日志
        throw err; // 可以重抛出错误，也可以根据需要进行错误处理
    });
}
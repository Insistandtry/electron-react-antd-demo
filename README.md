# electron-react-antd-demo
# created by juno, on 2020.7


目录结构
src：存放源码，有main和render文件夹；render中存放前端项目的源码
resources：存放资源的文件夹
dist：源码构建后生成的代码
release：存放使用electron-builder打包生成的桌面应用

项目修改点：
1、前端项目：修改config/config.ts的配置：
    1）需要使用hash路由；
    2）重新定义打包后的输出路径；
    3）配置electron-renderer
        publicPath: './',
        history: {
            type: 'hash'
        },
        chainWebpack: (config) => {
            config.target('electron-renderer')
        },
        // 重新定义打包后输出的路径
        outputPath: '../../dist/render_process'
2、项目：修改package.json的配置：
    1）main 配置项，指定应用启动脚本
    2）build => directories => output 指定打包输出的位置
    3）build => files 指定哪些文件会被打包进去

📦打包需要
最终打包需要的是dist文件夹、resources文件夹、package.json
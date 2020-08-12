import React, { useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography, Button } from 'antd';
import { ipcRenderer } from 'electron';
import styles from './Welcome.less';

const CodePreview: React.FC<{}> = ({ children }) => (
    <pre className={styles.pre}>
        <code>
            <Typography.Text copyable>{children}</Typography.Text>
        </code>
    </pre>
);

export default (): React.ReactNode => {
    console.log('welcome');

    useEffect(() => {
        ipcRenderer.on('async-reply', (event, arg) => {
            console.log('ipcRenderer event, arg ==> ', event, arg);
            const options = {
                title: '信息框标题',
                body: arg
            };

            new window.Notification(options.title, options);
            // myNotification.onclick = () => {
            //   console.log('【你点击了信息框！！】')
            //   // this.setState({ message: '【你点击了信息框！！】' })
            // }
        });
    }, []);

    return (
        <PageContainer>
            <Card>
                <Alert
                    message="更快更强的重型组件，已经发布。hahaha!!!"
                    type="success"
                    showIcon
                    banner
                    style={{
                        margin: -12,
                        marginBottom: 24
                    }}
                />
                <Typography.Text strong>
          高级表格{' '}
                    <a href="https://protable.ant.design/" rel="noopener noreferrer" target="__blank">
            欢迎使用
                    </a>
                </Typography.Text>
                <CodePreview>yarn add @ant-design/pro-table</CodePreview>
                <Typography.Text
                    strong
                    style={{
                        marginBottom: 12
                    }}
                >
          高级布局{' '}
                    <a href="https://prolayout.ant.design/" rel="noopener noreferrer" target="__blank">
            欢迎使用
                    </a>
                </Typography.Text>
                <CodePreview>yarn add @ant-design/pro-layout</CodePreview>

                <Button
                    onClick={() => {
                        // ipcRenderer.send('async-render', '我是来自渲染进程的同步消息');
                        ipcRenderer.send('notification', {
                            title: 'hahahaha',
                            body: 'sss'
                        });
                    }}
                >
          测试主进程和渲染进程通信
                </Button>
            </Card>
        </PageContainer>
    );
};

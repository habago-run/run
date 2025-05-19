"use client";
import { AppstoreAddOutlined, MoonOutlined, ProductOutlined, SunOutlined } from "@ant-design/icons";
import { Prompts, Sender, Welcome } from "@ant-design/x";
import { Button, ConfigProvider, theme } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import { App } from 'antd';


export default function Home() {
  const { message } = App.useApp();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const theme = localStorage.getItem('theme');
      if (theme) {
        setIsDarkMode(theme === 'dark');
      } else {
        setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
      }
    }
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode])

  const prompts = [
    {
      key: '1',
      icon: <ProductOutlined style={{ color: '#FFD700' }} />,
      label: '获取应用列表',
      description: '获取所有正在运行的应用列表',
    },
    {
      key: '2',
      icon: <AppstoreAddOutlined style={{ color: '#1890FF' }} />,
      label: '构建一个用户管理系统',
      description: '请帮我构建一个用户管理系统',
    }
  ];

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }} >
      <main className="flex  flex-col min-h-screen items-center bg-[url(./img/bg.svg)] bg-cover bg-center">
        <Button className="self-end m-8" type="text" icon={isDarkMode ? <MoonOutlined /> : <SunOutlined />} onClick={toggleTheme} />
        <div className="container flex flex-col flex-1 gap-4 h-full items-center">
          <div className="flex-1 flex flex-col justify-center gap-8">
            <Welcome
              icon={<Image src="/logo.png" alt="icon" width={58} height={58} priority />}
              title="欢迎访问哈巴狗"
              description="今天准备做个什么呢？"
            />
            <Prompts
              title="🤔 你可能想要:"
              items={prompts}
              onItemClick={(info) => {
                message.success(`You clicked a prompt: ${info.data.label}`);
              }}
            />
          </div>
          <Sender className="bg-white dark:bg-black" />
        </div>
        <footer className="flex flex-col items-center justify-center p-4 text-xs text-gray-800 dark:text-gray-200 gap-2">
          <p>© 2025 哈巴狗. All rights reserved.</p>
          <p className="flex text-sky-600 gap-4">
            <a href="https://beian.miit.gov.cn/" target="_blank">陕ICP备2025063359号-1</a>
            <a className="flex gap-1 items-center" href="https://beian.mps.gov.cn/#/query/webSearch?code=61011302002082" rel="noreferrer" target="_blank"><Image src="/police.png" alt="公安备案图标" width={16} height={16} />陕公网安备61011302002082号</a>
          </p>
        </footer>
      </main>
    </ConfigProvider>
  );
}

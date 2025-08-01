import { Line } from '@ant-design/charts';
import { useRequest } from '@umijs/max';
import { dailyBalance } from '@/services/report';
import t from '@/utils/i18n';

export default () => {
  // 模拟数据
  const mockData = [
    { date: '2025-08-01', account: '账户A', balance: 1000 },
    { date: '2025-08-02', account: '账户A', balance: 1200 },
    { date: '2025-08-03', account: '账户A', balance: 900 },
    { date: '2025-08-04', account: '账户A', balance: 1500 },
    { date: '2025-08-05', account: '账户A', balance: 1300 },
    { date: '2025-08-01', account: '账户B', balance: 800 },
    { date: '2025-08-02', account: '账户B', balance: 1000 },
    { date: '2025-08-03', account: '账户B', balance: 700 },
    { date: '2025-08-04', account: '账户B', balance: 1100 },
    { date: '2025-08-05', account: '账户B', balance: 900 },
  ];

  const { data = mockData, loading } = useRequest(dailyBalance, {
    formatResult: (result) => {
      return result.data.map(item => ({
        date: item.x,
        balance: item.y,
        account: '默认账户',
      }));
    },
  });

  const config = {
    data,
    xField: 'date',
    yField: 'balance',
    seriesField: 'account',
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 2000,
      },
    },
  };

  return <Line {...config} loading={loading} />;
};
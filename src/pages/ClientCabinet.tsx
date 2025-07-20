import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const ClientCabinet = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [smsCode, setSmsCode] = useState('');
  const [step, setStep] = useState<'phone' | 'sms'>('phone');

  // Моковые данные клиента
  const clientData = {
    name: 'Иван Петрович Сидоров',
    phone: '+7 (999) 123-45-67',
    email: 'ivan.sidorov@email.com',
    registrationDate: '2024-01-15',
    creditLimit: 50000,
    currentLoan: {
      amount: 15000,
      repaymentAmount: 18750,
      dueDate: '2024-02-15',
      daysLeft: 5,
      status: 'active'
    }
  };

  const loanHistory = [
    { id: 1, amount: 10000, repaid: 12500, date: '2024-01-01', status: 'completed' },
    { id: 2, amount: 25000, repaid: 31250, date: '2023-12-15', status: 'completed' },
    { id: 3, amount: 15000, repaid: 18750, date: '2024-01-16', status: 'active' },
  ];

  const handleSendSms = () => {
    if (phoneNumber.length >= 10) {
      setStep('sms');
    }
  };

  const handleLogin = () => {
    if (smsCode.length === 4) {
      setIsLoggedIn(true);
    }
  };

  const getStatusBadge = (status: string) => {
    const config = {
      active: { label: 'Активный', variant: 'default' as const },
      completed: { label: 'Погашен', variant: 'secondary' as const },
      overdue: { label: 'Просрочен', variant: 'destructive' as const },
    };
    return config[status as keyof typeof config] || { label: status, variant: 'outline' as const };
  };

  const calculateProgress = () => {
    const { amount, repaymentAmount } = clientData.currentLoan;
    const paid = repaymentAmount - amount;
    return (paid / repaymentAmount) * 100;
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="container mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <Icon name="Banknote" size={32} className="text-primary" />
              <div>
                <h1 className="text-xl font-bold">ДеньгиБыстро</h1>
                <p className="text-xs text-muted-foreground">Личный кабинет</p>
              </div>
            </Link>
            <Link to="/">
              <Button variant="outline">
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                На главную
              </Button>
            </Link>
          </div>
        </header>

        {/* Login Form */}
        <div className="flex items-center justify-center py-20">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mb-4">
                <Icon name="User" size={48} className="mx-auto text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold">Вход в личный кабинет</CardTitle>
              <p className="text-muted-foreground">
                {step === 'phone' ? 'Введите номер телефона' : 'Введите код из SMS'}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {step === 'phone' ? (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Номер телефона</label>
                    <Input
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="text-center"
                    />
                  </div>
                  <Button 
                    onClick={handleSendSms} 
                    className="w-full"
                    disabled={phoneNumber.length < 10}
                  >
                    <Icon name="MessageSquare" size={16} className="mr-2" />
                    Отправить SMS
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Код из SMS</label>
                    <Input
                      type="text"
                      placeholder="0000"
                      value={smsCode}
                      onChange={(e) => setSmsCode(e.target.value)}
                      className="text-center text-2xl tracking-widest"
                      maxLength={4}
                    />
                  </div>
                  <Button 
                    onClick={handleLogin} 
                    className="w-full"
                    disabled={smsCode.length !== 4}
                  >
                    <Icon name="LogIn" size={16} className="mr-2" />
                    Войти
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setStep('phone')}
                    className="w-full"
                  >
                    <Icon name="ArrowLeft" size={16} className="mr-2" />
                    Изменить номер
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <Icon name="Banknote" size={32} className="text-primary" />
            <div>
              <h1 className="text-xl font-bold">ДеньгиБыстро</h1>
              <p className="text-xs text-muted-foreground">Личный кабинет</p>
            </div>
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              {clientData.name}
            </span>
            <Button variant="outline" size="sm" onClick={() => setIsLoggedIn(false)}>
              <Icon name="LogOut" size={16} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        {/* Current Loan Alert */}
        {clientData.currentLoan.status === 'active' && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon name="AlertTriangle" size={24} className="text-orange-600" />
                  <div>
                    <p className="font-medium text-orange-900">
                      Активный займ: {clientData.currentLoan.amount.toLocaleString()} ₽
                    </p>
                    <p className="text-sm text-orange-700">
                      К возврату: {clientData.currentLoan.repaymentAmount.toLocaleString()} ₽ до {clientData.currentLoan.dueDate}
                    </p>
                  </div>
                </div>
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                  <Icon name="CreditCard" size={16} className="mr-2" />
                  Погасить
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <Icon name="LayoutDashboard" size={16} />
              <span>Главная</span>
            </TabsTrigger>
            <TabsTrigger value="loans" className="flex items-center space-x-2">
              <Icon name="FileText" size={16} />
              <span>Займы</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center space-x-2">
              <Icon name="CreditCard" size={16} />
              <span>Платежи</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <Icon name="User" size={16} />
              <span>Профиль</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Кредитный лимит</p>
                      <p className="text-3xl font-bold">{clientData.creditLimit.toLocaleString()} ₽</p>
                    </div>
                    <Icon name="TrendingUp" size={24} className="text-green-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Доступно к займу</p>
                      <p className="text-3xl font-bold text-green-600">
                        {(clientData.creditLimit - (clientData.currentLoan.status === 'active' ? clientData.currentLoan.amount : 0)).toLocaleString()} ₽
                      </p>
                    </div>
                    <Icon name="Wallet" size={24} className="text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Всего займов</p>
                      <p className="text-3xl font-bold">{loanHistory.length}</p>
                    </div>
                    <Icon name="BarChart3" size={24} className="text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {clientData.currentLoan.status === 'active' && (
              <Card>
                <CardHeader>
                  <CardTitle>Текущий займ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Сумма займа:</span>
                        <span className="font-medium">{clientData.currentLoan.amount.toLocaleString()} ₽</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">К возврату:</span>
                        <span className="font-medium">{clientData.currentLoan.repaymentAmount.toLocaleString()} ₽</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Дата возврата:</span>
                        <span className="font-medium">{clientData.currentLoan.dueDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Осталось дней:</span>
                        <span className={`font-medium ${clientData.currentLoan.daysLeft <= 3 ? 'text-red-600' : 'text-green-600'}`}>
                          {clientData.currentLoan.daysLeft}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Прогресс погашения</span>
                        <span>{Math.round(calculateProgress())}%</span>
                      </div>
                      <Progress value={calculateProgress()} className="h-2" />
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1">
                          <Icon name="CreditCard" size={14} className="mr-2" />
                          Погасить
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Icon name="Calendar" size={14} className="mr-2" />
                          Продлить
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Быстрые действия</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" size="lg">
                    <Icon name="Plus" size={20} className="mr-3" />
                    Оформить новый займ
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <Icon name="Calculator" size={20} className="mr-3" />
                    Калькулятор займа
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <Icon name="HeadphonesIcon" size={20} className="mr-3" />
                    Поддержка
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Последние операции</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {loanHistory.slice(0, 3).map((loan) => {
                      const statusBadge = getStatusBadge(loan.status);
                      return (
                        <div key={loan.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{loan.amount.toLocaleString()} ₽</p>
                            <p className="text-sm text-muted-foreground">{loan.date}</p>
                          </div>
                          <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Loans History */}
          <TabsContent value="loans" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>История займов</CardTitle>
                  <Button>
                    <Icon name="Plus" size={16} className="mr-2" />
                    Новый займ
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Номер</TableHead>
                      <TableHead>Сумма займа</TableHead>
                      <TableHead>К возврату</TableHead>
                      <TableHead>Дата</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loanHistory.map((loan) => {
                      const statusBadge = getStatusBadge(loan.status);
                      return (
                        <TableRow key={loan.id}>
                          <TableCell className="font-medium">#{loan.id}</TableCell>
                          <TableCell>{loan.amount.toLocaleString()} ₽</TableCell>
                          <TableCell>{loan.repaid.toLocaleString()} ₽</TableCell>
                          <TableCell>{loan.date}</TableCell>
                          <TableCell>
                            <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              <Icon name="Eye" size={14} className="mr-1" />
                              Подробно
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments */}
          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Способы погашения</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <Icon name="CreditCard" size={24} />
                    <span>Банковская карта</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <Icon name="Smartphone" size={24} />
                    <span>СБП (Быстрые платежи)</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <Icon name="Building" size={24} />
                    <span>Банковский перевод</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <Icon name="MapPin" size={24} />
                    <span>Через терминал</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Личная информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">ФИО</label>
                    <Input value={clientData.name} readOnly />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Телефон</label>
                    <Input value={clientData.phone} readOnly />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input value={clientData.email} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Дата регистрации</label>
                    <Input value={clientData.registrationDate} readOnly />
                  </div>
                </div>
                <div className="pt-4">
                  <Button>
                    <Icon name="Save" size={16} className="mr-2" />
                    Сохранить изменения
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ClientCabinet;
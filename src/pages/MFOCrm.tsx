import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const MFOCrm = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Моковые данные заявок на займы
  const mockLoanApplications = [
    { 
      id: 1, 
      clientName: 'Иванов Иван Иванович', 
      phone: '+7 (999) 123-45-67',
      amount: 25000, 
      term: 30, 
      status: 'pending', 
      priority: 'high', 
      date: '2024-01-20',
      creditScore: 750,
      income: 45000
    },
    { 
      id: 2, 
      clientName: 'Петрова Анна Сергеевна', 
      phone: '+7 (999) 234-56-78',
      amount: 15000, 
      term: 15, 
      status: 'approved', 
      priority: 'medium', 
      date: '2024-01-19',
      creditScore: 680,
      income: 35000
    },
    { 
      id: 3, 
      clientName: 'Сидоров Петр Александрович', 
      phone: '+7 (999) 345-67-89',
      amount: 50000, 
      term: 60, 
      status: 'rejected', 
      priority: 'low', 
      date: '2024-01-18',
      creditScore: 520,
      income: 25000
    },
    { 
      id: 4, 
      clientName: 'Козлова Мария Викторовна', 
      phone: '+7 (999) 456-78-90',
      amount: 35000, 
      term: 45, 
      status: 'verification', 
      priority: 'high', 
      date: '2024-01-17',
      creditScore: 720,
      income: 40000
    },
  ];

  const mockActiveLoans = [
    { 
      id: 1, 
      clientName: 'Петрова Анна Сергеевна', 
      amount: 15000, 
      repaymentAmount: 18750,
      dueDate: '2024-02-19',
      daysOverdue: 0,
      status: 'active'
    },
    { 
      id: 2, 
      clientName: 'Волков Дмитрий Николаевич', 
      amount: 20000, 
      repaymentAmount: 26000,
      dueDate: '2024-01-15',
      daysOverdue: 5,
      status: 'overdue'
    },
  ];

  const mockEmployees = [
    { id: 1, name: 'Смирнов Алексей Петрович', position: 'Кредитный аналитик', phone: '+7 (999) 111-22-33', status: 'active', applications: 12 },
    { id: 2, name: 'Федорова Елена Ивановна', position: 'Менеджер по работе с клиентами', phone: '+7 (999) 222-33-44', status: 'active', applications: 8 },
    { id: 3, name: 'Новиков Игорь Сергеевич', position: 'Андеррайтер', phone: '+7 (999) 333-44-55', status: 'busy', applications: 15 },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'На рассмотрении', variant: 'default' as const },
      approved: { label: 'Одобрена', variant: 'secondary' as const },
      rejected: { label: 'Отклонена', variant: 'destructive' as const },
      verification: { label: 'Верификация', variant: 'outline' as const },
      active: { label: 'Активный', variant: 'secondary' as const },
      overdue: { label: 'Просрочен', variant: 'destructive' as const },
    };
    return statusConfig[status as keyof typeof statusConfig] || { label: status, variant: 'outline' as const };
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      high: { label: 'Высокий', variant: 'destructive' as const },
      medium: { label: 'Средний', variant: 'default' as const },
      low: { label: 'Низкий', variant: 'secondary' as const },
    };
    return priorityConfig[priority as keyof typeof priorityConfig] || { label: priority, variant: 'outline' as const };
  };

  const handleLogin = () => {
    if (phoneNumber.length >= 10) {
      setIsLoggedIn(true);
    }
  };

  const filteredApplications = selectedStatus === 'all' 
    ? mockLoanApplications 
    : mockLoanApplications.filter(app => app.status === selectedStatus);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mb-4">
              <Icon name="Banknote" size={48} className="mx-auto text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">CRM ДеньгиБыстро</CardTitle>
            <p className="text-muted-foreground">Вход для сотрудников МФО</p>
          </CardHeader>
          <CardContent className="space-y-4">
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
              onClick={handleLogin} 
              className="w-full"
              disabled={phoneNumber.length < 10}
            >
              <Icon name="LogIn" size={16} className="mr-2" />
              Войти в CRM
            </Button>
            <div className="text-center text-sm text-muted-foreground space-y-2">
              <Link to="/" className="text-primary hover:underline block">
                ← На главную страницу
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Banknote" size={32} className="text-primary" />
            <div>
              <h1 className="text-xl font-bold">CRM ДеньгиБыстро</h1>
              <p className="text-xs text-muted-foreground">Управление займами</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <Icon name="Globe" size={16} className="mr-2" />
                Сайт МФО
              </Button>
            </Link>
            <span className="text-sm text-muted-foreground">Сотрудник: {phoneNumber}</span>
            <Button variant="outline" size="sm" onClick={() => setIsLoggedIn(false)}>
              <Icon name="LogOut" size={16} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full max-w-3xl">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <Icon name="LayoutDashboard" size={16} />
              <span>Главная</span>
            </TabsTrigger>
            <TabsTrigger value="applications" className="flex items-center space-x-2">
              <Icon name="FileText" size={16} />
              <span>Заявки</span>
            </TabsTrigger>
            <TabsTrigger value="loans" className="flex items-center space-x-2">
              <Icon name="CreditCard" size={16} />
              <span>Займы</span>
            </TabsTrigger>
            <TabsTrigger value="employees" className="flex items-center space-x-2">
              <Icon name="Users" size={16} />
              <span>Сотрудники</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <Icon name="BarChart3" size={16} />
              <span>Аналитика</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Новые заявки</p>
                      <p className="text-3xl font-bold text-blue-600">
                        {mockLoanApplications.filter(r => r.status === 'pending').length}
                      </p>
                    </div>
                    <Icon name="FileText" size={24} className="text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Активные займы</p>
                      <p className="text-3xl font-bold text-green-600">
                        {mockActiveLoans.filter(l => l.status === 'active').length}
                      </p>
                    </div>
                    <Icon name="CreditCard" size={24} className="text-green-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Просрочки</p>
                      <p className="text-3xl font-bold text-red-600">
                        {mockActiveLoans.filter(l => l.status === 'overdue').length}
                      </p>
                    </div>
                    <Icon name="AlertTriangle" size={24} className="text-red-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Одобрено сегодня</p>
                      <p className="text-3xl font-bold text-purple-600">
                        {mockLoanApplications.filter(r => r.status === 'approved').length}
                      </p>
                    </div>
                    <Icon name="CheckCircle" size={24} className="text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Срочные заявки</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockLoanApplications.filter(app => app.priority === 'high').slice(0, 3).map((application) => {
                      const statusBadge = getStatusBadge(application.status);
                      return (
                        <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">{application.clientName}</p>
                            <p className="text-sm text-muted-foreground">
                              {application.amount.toLocaleString()} ₽ на {application.term} дней
                            </p>
                            <p className="text-xs text-muted-foreground">{application.date}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Активные займы</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockActiveLoans.map((loan) => {
                      const statusBadge = getStatusBadge(loan.status);
                      return (
                        <div key={loan.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <p className="font-medium">{loan.clientName}</p>
                            <p className="text-sm text-muted-foreground">
                              {loan.amount.toLocaleString()} ₽ → {loan.repaymentAmount.toLocaleString()} ₽
                            </p>
                            <p className="text-xs text-muted-foreground">
                              До {loan.dueDate}
                              {loan.daysOverdue > 0 && (
                                <span className="text-red-600 ml-2">
                                  (просрочка {loan.daysOverdue} дн.)
                                </span>
                              )}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Applications */}
          <TabsContent value="applications" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Заявки на займы</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Статус заявки" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все заявки</SelectItem>
                        <SelectItem value="pending">На рассмотрении</SelectItem>
                        <SelectItem value="verification">Верификация</SelectItem>
                        <SelectItem value="approved">Одобренные</SelectItem>
                        <SelectItem value="rejected">Отклоненные</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button>
                      <Icon name="Plus" size={16} className="mr-2" />
                      Новая заявка
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Клиент</TableHead>
                      <TableHead>Телефон</TableHead>
                      <TableHead>Сумма / Срок</TableHead>
                      <TableHead>Кредитный рейтинг</TableHead>
                      <TableHead>Доход</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Дата</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApplications.map((application) => {
                      const statusBadge = getStatusBadge(application.status);
                      return (
                        <TableRow key={application.id}>
                          <TableCell className="font-medium">#{application.id}</TableCell>
                          <TableCell>{application.clientName}</TableCell>
                          <TableCell>{application.phone}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{application.amount.toLocaleString()} ₽</div>
                              <div className="text-sm text-muted-foreground">{application.term} дней</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <span className={`font-medium ${
                                application.creditScore >= 700 ? 'text-green-600' : 
                                application.creditScore >= 600 ? 'text-yellow-600' : 'text-red-600'
                              }`}>
                                {application.creditScore}
                              </span>
                              <Progress 
                                value={application.creditScore / 10} 
                                className="w-16 h-2"
                              />
                            </div>
                          </TableCell>
                          <TableCell>{application.income.toLocaleString()} ₽</TableCell>
                          <TableCell>
                            <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                          </TableCell>
                          <TableCell>{application.date}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm">
                                <Icon name="Eye" size={14} />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Icon name="Edit" size={14} />
                              </Button>
                              {application.status === 'pending' && (
                                <Button variant="outline" size="sm" className="text-green-600">
                                  <Icon name="Check" size={14} />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Active Loans */}
          <TabsContent value="loans" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Активные займы</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline">
                      <Icon name="Download" size={16} className="mr-2" />
                      Экспорт
                    </Button>
                    <Button>
                      <Icon name="Plus" size={16} className="mr-2" />
                      Выдать займ
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Клиент</TableHead>
                      <TableHead>Сумма займа</TableHead>
                      <TableHead>К возврату</TableHead>
                      <TableHead>Дата возврата</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockActiveLoans.map((loan) => {
                      const statusBadge = getStatusBadge(loan.status);
                      return (
                        <TableRow key={loan.id}>
                          <TableCell className="font-medium">#{loan.id}</TableCell>
                          <TableCell>{loan.clientName}</TableCell>
                          <TableCell>{loan.amount.toLocaleString()} ₽</TableCell>
                          <TableCell>{loan.repaymentAmount.toLocaleString()} ₽</TableCell>
                          <TableCell>
                            <div>
                              <div>{loan.dueDate}</div>
                              {loan.daysOverdue > 0 && (
                                <div className="text-sm text-red-600">
                                  Просрочка: {loan.daysOverdue} дн.
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm">
                                <Icon name="Eye" size={14} />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Icon name="Phone" size={14} />
                              </Button>
                              {loan.status === 'overdue' && (
                                <Button variant="outline" size="sm" className="text-red-600">
                                  <Icon name="AlertTriangle" size={14} />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Employees */}
          <TabsContent value="employees" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Сотрудники МФО</CardTitle>
                  <Button>
                    <Icon name="UserPlus" size={16} className="mr-2" />
                    Добавить сотрудника
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ФИО</TableHead>
                      <TableHead>Должность</TableHead>
                      <TableHead>Телефон</TableHead>
                      <TableHead>Заявок в работе</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockEmployees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium">{employee.name}</TableCell>
                        <TableCell>{employee.position}</TableCell>
                        <TableCell>{employee.phone}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {employee.applications}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={employee.status === 'active' ? 'secondary' : 'default'}>
                            {employee.status === 'active' ? 'Активен' : 'Занят'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Icon name="Edit" size={14} />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Icon name="MessageSquare" size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Статистика за месяц</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Подано заявок:</span>
                    <span className="font-bold text-2xl">147</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Одобрено:</span>
                    <span className="font-bold text-2xl text-green-600">89</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Отклонено:</span>
                    <span className="font-bold text-2xl text-red-600">58</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Конверсия:</span>
                    <span className="font-bold text-2xl text-blue-600">60.5%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Финансовые показатели</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Выдано займов:</span>
                    <span className="font-bold text-2xl">2.8М ₽</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Возвращено:</span>
                    <span className="font-bold text-2xl text-green-600">2.1М ₽</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Просрочка:</span>
                    <span className="font-bold text-2xl text-red-600">145К ₽</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Прибыль:</span>
                    <span className="font-bold text-2xl text-purple-600">580К ₽</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default MFOCrm;
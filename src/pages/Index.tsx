import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Моковые данные заявок
  const mockRequests = [
    { id: 1, title: 'Заявка на обслуживание оборудования', description: 'Требуется техническое обслуживание принтера HP', status: 'new', priority: 'high', date: '2024-01-15' },
    { id: 2, title: 'Замена картриджа', description: 'Необходима замена картриджа в копировальном аппарате', status: 'in_progress', priority: 'medium', date: '2024-01-14' },
    { id: 3, title: 'Настройка ПО', description: 'Установка и настройка антивирусного программного обеспечения', status: 'completed', priority: 'low', date: '2024-01-13' },
    { id: 4, title: 'Ремонт компьютера', description: 'Не включается рабочий компьютер в отделе продаж', status: 'new', priority: 'high', date: '2024-01-12' },
  ];

  const mockEmployees = [
    { id: 1, name: 'Иванов Петр Сергеевич', position: 'Системный администратор', phone: '+7 (999) 123-45-67', status: 'active' },
    { id: 2, name: 'Смирнова Анна Викторовна', position: 'Технический специалист', phone: '+7 (999) 234-56-78', status: 'active' },
    { id: 3, name: 'Козлов Дмитрий Александрович', position: 'Инженер поддержки', phone: '+7 (999) 345-67-89', status: 'busy' },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      new: { label: 'Новая', variant: 'destructive' as const },
      in_progress: { label: 'В работе', variant: 'default' as const },
      completed: { label: 'Выполнена', variant: 'secondary' as const },
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

  const filteredRequests = selectedStatus === 'all' 
    ? mockRequests 
    : mockRequests.filter(req => req.status === selectedStatus);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mb-4">
              <Icon name="Building2" size={48} className="mx-auto text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">CRM Система</CardTitle>
            <p className="text-muted-foreground">Вход для сотрудников</p>
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
              Войти в систему
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              <a href="#employee-link" className="text-primary hover:underline">
                Ссылка для входа сотрудника
              </a>
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
            <Icon name="Building2" size={32} className="text-primary" />
            <h1 className="text-xl font-bold">CRM Система</h1>
          </div>
          <div className="flex items-center space-x-4">
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
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <Icon name="LayoutDashboard" size={16} />
              <span>Главная</span>
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex items-center space-x-2">
              <Icon name="FileText" size={16} />
              <span>Заявки</span>
            </TabsTrigger>
            <TabsTrigger value="employees" className="flex items-center space-x-2">
              <Icon name="Users" size={16} />
              <span>Сотрудники</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Icon name="Settings" size={16} />
              <span>Настройки</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Всего заявок</p>
                      <p className="text-3xl font-bold">{mockRequests.length}</p>
                    </div>
                    <Icon name="FileText" size={24} className="text-primary" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Новые</p>
                      <p className="text-3xl font-bold text-red-600">
                        {mockRequests.filter(r => r.status === 'new').length}
                      </p>
                    </div>
                    <Icon name="AlertCircle" size={24} className="text-red-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">В работе</p>
                      <p className="text-3xl font-bold text-blue-600">
                        {mockRequests.filter(r => r.status === 'in_progress').length}
                      </p>
                    </div>
                    <Icon name="Clock" size={24} className="text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Выполнено</p>
                      <p className="text-3xl font-bold text-green-600">
                        {mockRequests.filter(r => r.status === 'completed').length}
                      </p>
                    </div>
                    <Icon name="CheckCircle" size={24} className="text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Последние заявки</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRequests.slice(0, 3).map((request) => {
                    const statusBadge = getStatusBadge(request.status);
                    const priorityBadge = getPriorityBadge(request.priority);
                    return (
                      <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <p className="font-medium">{request.title}</p>
                          <p className="text-sm text-muted-foreground">{request.description}</p>
                          <p className="text-xs text-muted-foreground">{request.date}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={priorityBadge.variant}>{priorityBadge.label}</Badge>
                          <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Requests */}
          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Управление заявками</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Статус" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все заявки</SelectItem>
                        <SelectItem value="new">Новые</SelectItem>
                        <SelectItem value="in_progress">В работе</SelectItem>
                        <SelectItem value="completed">Выполненные</SelectItem>
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
                      <TableHead>Заголовок</TableHead>
                      <TableHead>Описание</TableHead>
                      <TableHead>Приоритет</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Дата</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.map((request) => {
                      const statusBadge = getStatusBadge(request.status);
                      const priorityBadge = getPriorityBadge(request.priority);
                      return (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">#{request.id}</TableCell>
                          <TableCell>{request.title}</TableCell>
                          <TableCell className="max-w-xs truncate">{request.description}</TableCell>
                          <TableCell>
                            <Badge variant={priorityBadge.variant}>{priorityBadge.label}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                          </TableCell>
                          <TableCell>{request.date}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm">
                                <Icon name="Eye" size={14} />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Icon name="Edit" size={14} />
                              </Button>
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
                  <CardTitle>Управление сотрудниками</CardTitle>
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
                              <Icon name="Trash2" size={14} />
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

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Настройки системы</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Профиль</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Имя</label>
                        <Input placeholder="Введите имя" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input type="email" placeholder="email@company.com" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Уведомления</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Email уведомления</span>
                        <input type="checkbox" className="h-4 w-4" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">SMS уведомления</span>
                        <input type="checkbox" className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button>
                      <Icon name="Save" size={16} className="mr-2" />
                      Сохранить настройки
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const MFOLanding = () => {
  const [loanAmount, setLoanAmount] = useState('15000');
  const [loanPeriod, setLoanPeriod] = useState('30');

  const calculatePayment = () => {
    const amount = parseInt(loanAmount);
    const days = parseInt(loanPeriod);
    const dailyRate = 0.01; // 1% в день
    return Math.round(amount * (1 + dailyRate * days));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Banknote" size={32} className="text-primary" />
            <div>
              <h1 className="text-xl font-bold">ДеньгиБыстро</h1>
              <p className="text-xs text-muted-foreground">Микрофинансовая организация</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#services" className="text-sm hover:text-primary transition-colors">Услуги</a>
            <a href="#calculator" className="text-sm hover:text-primary transition-colors">Калькулятор</a>
            <a href="#about" className="text-sm hover:text-primary transition-colors">О нас</a>
            <a href="#contacts" className="text-sm hover:text-primary transition-colors">Контакты</a>
          </nav>
          <div className="flex items-center space-x-3">
            <Link to="/client">
              <Button variant="outline">
                <Icon name="User" size={16} className="mr-2" />
                Личный кабинет
              </Button>
            </Link>
            <Link to="/crm">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                CRM
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="w-fit">Одобрение за 5 минут</Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Займы до <span className="text-primary">500 000 ₽</span><br />
                быстро и надежно
              </h1>
              <p className="text-lg text-muted-foreground">
                Получите деньги на карту уже сегодня. Минимум документов, максимум скорости.
                Работаем круглосуточно, 7 дней в неделю.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="px-8">
                  <Icon name="CreditCard" size={20} className="mr-2" />
                  Получить займ
                </Button>
                <Button variant="outline" size="lg">
                  <Icon name="Calculator" size={20} className="mr-2" />
                  Рассчитать платеж
                </Button>
              </div>
            </div>
            
            {/* Loan Calculator Card */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Calculator" size={24} className="mr-2 text-primary" />
                  Калькулятор займа
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Сумма займа</label>
                  <div className="relative">
                    <Input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      className="pr-8"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₽</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>От 1 000 ₽</span>
                    <span>До 500 000 ₽</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Срок займа</label>
                  <div className="relative">
                    <Input
                      type="number"
                      value={loanPeriod}
                      onChange={(e) => setLoanPeriod(e.target.value)}
                      className="pr-12"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">дней</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>От 7 дней</span>
                    <span>До 365 дней</span>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">К возврату:</span>
                    <span className="text-2xl font-bold text-primary">{calculatePayment().toLocaleString()} ₽</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Переплата: {(calculatePayment() - parseInt(loanAmount)).toLocaleString()} ₽
                  </div>
                </div>
                
                <Button className="w-full" size="lg">
                  <Icon name="Send" size={16} className="mr-2" />
                  Подать заявку
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Почему выбирают нас</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Мы предлагаем выгодные условия займов с быстрым рассмотрением заявок
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Zap" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Быстрое решение</h3>
                <p className="text-muted-foreground">
                  Рассмотрение заявки за 5 минут. Деньги на карте в течение часа.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Shield" size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Безопасность</h3>
                <p className="text-muted-foreground">
                  Ваши данные защищены современными технологиями шифрования.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="CreditCard" size={32} className="text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Без залога</h3>
                <p className="text-muted-foreground">
                  Займы без залога и поручителей. Только паспорт и банковская карта.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Требования к заемщику</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Icon name="Check" size={20} className="text-green-600" />
                  <span>Возраст от 18 до 70 лет</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Check" size={20} className="text-green-600" />
                  <span>Гражданство РФ</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Check" size={20} className="text-green-600" />
                  <span>Действующий паспорт</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Check" size={20} className="text-green-600" />
                  <span>Банковская карта любого банка</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Check" size={20} className="text-green-600" />
                  <span>Мобильный телефон</span>
                </div>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Тарифы займов</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="font-medium">Сумма займа</span>
                    <span>1 000 - 500 000 ₽</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="font-medium">Срок займа</span>
                    <span>7 - 365 дней</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="font-medium">Ставка</span>
                    <span>От 0.5% в день</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Время рассмотрения</span>
                    <span className="text-green-600 font-semibold">5 минут</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Banknote" size={24} className="text-primary" />
                <span className="text-lg font-semibold">ДеньгиБыстро</span>
              </div>
              <p className="text-gray-400 text-sm">
                Микрофинансовая организация, предоставляющая займы физическим лицам.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Займы до зарплаты</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Долгосрочные займы</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Рефинансирование</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">О компании</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Лицензии</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Условия займов</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Icon name="Phone" size={16} />
                  <span>8 (800) 555-35-35</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Mail" size={16} />
                  <span>info@dengibystro.ru</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} />
                  <span>Круглосуточно</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 ДеньгиБыстро. Все права защищены. | ИНН: 1234567890 | ОГРН: 1234567890123</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MFOLanding;
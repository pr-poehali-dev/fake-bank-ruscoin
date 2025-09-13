import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeSection, setActiveSection] = useState('dashboard');

  // Mock user data
  const users = {
    artmult: { password: 'artem.555', balance: 999999999, isAdmin: true },
    user1: { password: 'pass1', balance: 25000, isAdmin: false }
  };

  const mockTransactions = [
    { id: 1, type: 'Перевод', amount: -1500, date: '13.09.2025', description: 'Перевод другу' },
    { id: 2, type: 'Пополнение', amount: 5000, date: '12.09.2025', description: 'Зарплата' },
    { id: 3, type: 'Покупка', amount: -850, date: '11.09.2025', description: 'Продукты' }
  ];

  const handleAuth = () => {
    if (users[username] && users[username].password === password) {
      setCurrentUser(username);
      setActiveSection('dashboard');
    } else {
      alert('Неверные данные');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setUsername('');
    setPassword('');
    setActiveSection('dashboard');
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
        <Card className="w-full max-w-md hover-scale animate-fade-in">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                <Icon name="Banknote" size={20} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold">RYS Банк</h1>
            </div>
            <CardTitle>{isLoginMode ? 'Вход в систему' : 'Регистрация'}</CardTitle>
            <CardDescription>
              {isLoginMode ? 'Войдите в свой аккаунт' : 'Создайте новый аккаунт'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Логин</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Введите логин"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
              />
            </div>
            <Button onClick={handleAuth} className="w-full gradient-bg">
              {isLoginMode ? 'Войти' : 'Зарегистрироваться'}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              {isLoginMode ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
              <Button 
                variant="link" 
                className="p-0 ml-1"
                onClick={() => setIsLoginMode(!isLoginMode)}
              >
                {isLoginMode ? 'Регистрация' : 'Войти'}
              </Button>
            </p>
            <div className="text-xs text-center text-muted-foreground mt-4 p-2 bg-muted rounded">
              Тестовый аккаунт: artmult / artem.555
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentUserData = users[currentUser];
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                <Icon name="Banknote" size={20} className="text-white" />
              </div>
              <h1 className="text-xl font-bold">RYS Банк</h1>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              {['dashboard', 'transfers', 'deposits', 'loans', 'history'].map((section) => (
                <Button
                  key={section}
                  variant={activeSection === section ? 'default' : 'ghost'}
                  onClick={() => setActiveSection(section)}
                  className="capitalize"
                >
                  {section === 'dashboard' && 'Главная'}
                  {section === 'transfers' && 'Переводы'}
                  {section === 'deposits' && 'Вклады'}
                  {section === 'loans' && 'Кредиты'}
                  {section === 'history' && 'История'}
                </Button>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="hidden sm:flex">
                <Icon name="User" size={14} className="mr-1" />
                {currentUser}
              </Badge>
              <Button variant="outline" onClick={logout}>
                <Icon name="LogOut" size={16} className="mr-2" />
                Выход
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Dashboard */}
        {activeSection === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            {/* Welcome Section */}
            <div className="gradient-bg rounded-2xl p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    Добро пожаловать, {currentUser}!
                  </h2>
                  <p className="text-white/80">Управляйте своими финансами с RYS Банк</p>
                </div>
                <div className="text-right">
                  <p className="text-white/80 mb-1">Баланс</p>
                  <p className="text-4xl font-bold">
                    {currentUserData.balance.toLocaleString()} ₽
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { icon: 'Send', title: 'Переводы', desc: 'Отправить деньги', section: 'transfers' },
                { icon: 'PiggyBank', title: 'Вклады', desc: 'Открыть вклад', section: 'deposits' },
                { icon: 'CreditCard', title: 'Кредиты', desc: 'Оформить кредит', section: 'loans' },
                { icon: 'History', title: 'История', desc: 'Операции', section: 'history' }
              ].map((action, i) => (
                <Card 
                  key={i} 
                  className="hover-scale cursor-pointer animate-scale-in"
                  style={{ animationDelay: `${i * 0.1}s` }}
                  onClick={() => setActiveSection(action.section)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon name={action.icon} size={24} className="text-primary" />
                    </div>
                    <h3 className="font-semibold mb-1">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="TrendingUp" className="text-green-500" />
                    Доходы за месяц
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-green-500">+45,230 ₽</p>
                  <p className="text-sm text-muted-foreground">↑ +12% к прошлому месяцу</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="TrendingDown" className="text-red-500" />
                    Расходы за месяц
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-red-500">-23,180 ₽</p>
                  <p className="text-sm text-muted-foreground">↓ -5% к прошлому месяцу</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Target" className="text-blue-500" />
                    Цель накоплений
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">67%</p>
                  <Progress value={67} className="mt-2" />
                  <p className="text-sm text-muted-foreground mt-2">67,000 ₽ из 100,000 ₽</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Transfers Section */}
        {activeSection === 'transfers' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold">Переводы</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Новый перевод</CardTitle>
                  <CardDescription>Отправьте рускоины другому пользователю</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Получатель</Label>
                    <Input placeholder="Логин получателя" />
                  </div>
                  <div className="space-y-2">
                    <Label>Сумма</Label>
                    <Input placeholder="0" type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label>Комментарий</Label>
                    <Input placeholder="Назначение платежа" />
                  </div>
                  <Button className="w-full gradient-bg">Отправить</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Быстрые переводы</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {['user1', 'friend2', 'colleague3'].map((user, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Icon name="User" size={16} />
                          </div>
                          <span className="font-medium">{user}</span>
                        </div>
                        <Button size="sm" variant="outline">Перевести</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Deposits Section */}
        {activeSection === 'deposits' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold">Вклады</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Стандартный', rate: '5.5%', term: '12 месяцев', minAmount: 10000 },
                { name: 'Премиум', rate: '7.2%', term: '24 месяца', minAmount: 50000 },
                { name: 'VIP', rate: '9.1%', term: '36 месяцев', minAmount: 100000 }
              ].map((deposit, i) => (
                <Card key={i} className="hover-scale">
                  <CardHeader>
                    <CardTitle>{deposit.name}</CardTitle>
                    <CardDescription>Срок: {deposit.term}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary mb-2">{deposit.rate}</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        Минимум: {deposit.minAmount.toLocaleString()} ₽
                      </p>
                      <Button className="w-full">Открыть вклад</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Loans Section */}
        {activeSection === 'loans' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold">Кредиты</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'Потребительский', rate: '15.9%', maxAmount: 500000, term: '60 месяцев' },
                { name: 'На покупки', rate: '12.5%', maxAmount: 200000, term: '36 месяцев' }
              ].map((loan, i) => (
                <Card key={i} className="hover-scale">
                  <CardHeader>
                    <CardTitle>{loan.name}</CardTitle>
                    <CardDescription>До {loan.maxAmount.toLocaleString()} ₽</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Ставка:</span>
                        <span className="font-semibold">{loan.rate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Срок:</span>
                        <span className="font-semibold">{loan.term}</span>
                      </div>
                      <Button className="w-full gradient-bg">Оформить</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* History Section */}
        {activeSection === 'history' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold">История операций</h2>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {mockTransactions.map((transaction) => (
                    <div key={transaction.id} className="p-4 flex items-center justify-between hover:bg-muted/50">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.amount > 0 ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          <Icon 
                            name={transaction.amount > 0 ? 'ArrowDownLeft' : 'ArrowUpRight'} 
                            size={16} 
                            className={transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}
                          />
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString()} ₽
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          {transaction.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
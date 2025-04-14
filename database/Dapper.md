## Dapper

### Kdy použít

> [!NOTE]
> Pro projekty, kde je klíčový výkon nebo kontrola nad databází.

- Výkon: Maximální výkon, nízká režie
- Snadnost vývoje: Ruční psaní SQL, více práce
- Komplexní modely: Ruční správa modelů
- Flexibilita dotazů: Vysoká – plná kontrola nad SQL

### Použití

1. Instalace NuGet balíčku:
   
    ```bash
    dotnet add package Dapper
    ```

2. Konfigurace a použití:

   ```bash
    using System;
    using System.Data.SqlClient;
    using System.Threading.Tasks;
    using Dapper;
    
    // Příklad implementace v aplikační vrstvě
    public class UserRepository
    {
        private readonly string _connectionString;
    
        public UserRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
    
        // Metoda na získání uživatelů starších než zadaný věk
        public async Task<IEnumerable<User>> GetUsersOlderThanAsync(int age)
        {
            const string sql = "SELECT Id, Name, Age FROM Users WHERE Age > @Age";
    
            using (var connection = new SqlConnection(_connectionString))
            {
                return await connection.QueryAsync<User>(sql, new { Age = age });
            }
        }
    }
    
    // Model entity
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
    }
    
    // Použití repository ve službě
    public class UserService
    {
        private readonly UserRepository _repository;
    
        public UserService(UserRepository repository)
        {
            _repository = repository;
        }
    
        public async Task ShowUsersAsync()
        {
            var users = await _repository.GetUsersOlderThanAsync(18);
            foreach (var user in users)
            {
                Console.WriteLine($"ID: {user.Id}, Name: {user.Name}, Age: {user.Age}");
            }
        }
    }
    
    // Hlavní program
    class Program
    {
        static async Task Main()
        {
            var connectionString = "Server=myServer;Database=myDatabase;User Id=myUser;Password=myPassword;";
            var userRepository = new UserRepository(connectionString);
            var userService = new UserService(userRepository);
    
            await userService.ShowUsersAsync();
        }
    }
   ```

   > [!NOTE]
   > Dapper je v tomo příkladu použit v následující části kódu:
   > ```bash
   > using (var connection = new SqlConnection(_connectionString))
   > {
   >     return await connection.QueryAsync<User>(sql, new { Age = age });
   > }
   > ```
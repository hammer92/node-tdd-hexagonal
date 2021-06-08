<h1 align="center">
 Hexagonal Architecture, TDD in NodeJs (Fastify)
</h1>

<p align="center">
  Ejemplo de una <strong>aplicacion en nodejs que utiliza los 
principios del desarrollo guiado por pruebas de software (TDD), </strong> 
manteniendo el código lo más simple posible.
  </p>

## Configuración del entorno

### Herramientas necesarias

1. [Install Nodejs](https://nodejs.org/es/)
2. Clonar este proyecto: `git clone https://github.com/hammer92/node-tdd-hexagonal.git`
3. Mover a la carpeta del proyecto: `cd node-tdd-hexagonal`

### Configuración del entorno

1. Crea un archivo de entorno local(`cp .env.example .env`) modifica los parametros de conexion a base de datos
entre otros

### Ejecución de la aplicación

1. Instale todas las dependencias: `npm install`
2. Ejecuta la aplicacion en modo desarrollo: `npm run dev`
3. Entonces tendrás dos aplicaciones disponibles (APIs):
    1. [Aplicacion APIs](src): http://localhost:3000/api
    2. [Swagger APIs](plugins/swagger.js): http://localhost:3000/api/swagger

### Tests execution

1. Ejecutar pruebas: `npm run test`

[comment]: <> (## 👩‍💻 Project explanation)

[comment]: <> (This project tries to be a MOOC &#40;Massive Open Online Course&#41; platform. It's decoupled from any framework, but it has)

[comment]: <> (some Symfony and Laravel implementations.)

[comment]: <> (### ⛱️ Bounded Contexts)

[comment]: <> (* [Mooc]&#40;src/Mooc&#41;: Place to look in if you wanna see some code 🙂. Massive Open Online Courses public platform with users, videos, notifications, and so on.)

[comment]: <> (* [Backoffice]&#40;src/Backoffice&#41;: Here you'll find the use cases needed by the Customer Support department in order to manage users, courses, videos, and so on.)

[comment]: <> (### 🎯 Hexagonal Architecture)

[comment]: <> (This repository follows the Hexagonal Architecture pattern. Also, it's structured using `modules`.)

[comment]: <> (With this, we can see that the current structure of a Bounded Context is:)

[comment]: <> (```scala)

[comment]: <> ($ tree -L 4 src)

[comment]: <> (src)

[comment]: <> (|-- Mooc // Company subdomain / Bounded Context: Features related to one of the company business lines / products)

[comment]: <> (|   `-- Videos // Some Module inside the Mooc context)

[comment]: <> (|       |-- Application)

[comment]: <> (|       |   |-- Create // Inside the application layer all is structured by actions)

[comment]: <> (|       |   |   |-- CreateVideoCommand.php)

[comment]: <> (|       |   |   |-- CreateVideoCommandHandler.php)

[comment]: <> (|       |   |   `-- VideoCreator.php)

[comment]: <> (|       |   |-- Find)

[comment]: <> (|       |   |-- Trim)

[comment]: <> (|       |   `-- Update)

[comment]: <> (|       |-- Domain)

[comment]: <> (|       |   |-- Video.php // The Aggregate of the Module)

[comment]: <> (|       |   |-- VideoCreatedDomainEvent.php // A Domain Event)

[comment]: <> (|       |   |-- VideoFinder.php)

[comment]: <> (|       |   |-- VideoId.php)

[comment]: <> (|       |   |-- VideoNotFound.php)

[comment]: <> (|       |   |-- VideoRepository.php // The `Interface` of the repository is inside Domain)

[comment]: <> (|       |   |-- VideoTitle.php)

[comment]: <> (|       |   |-- VideoType.php)

[comment]: <> (|       |   |-- VideoUrl.php)

[comment]: <> (|       |   `-- Videos.php // A collection of our Aggregate)

[comment]: <> (|       `-- Infrastructure // The infrastructure of our module)

[comment]: <> (|           |-- DependencyInjection)

[comment]: <> (|           `-- Persistence)

[comment]: <> (|               `--MySqlVideoRepository.php // An implementation of the repository)

[comment]: <> (`-- Shared // Shared Kernel: Common infrastructure and domain shared between the different Bounded Contexts)

[comment]: <> (    |-- Domain)

[comment]: <> (    `-- Infrastructure)

[comment]: <> (```)

[comment]: <> (#### Repository pattern)

[comment]: <> (Our repositories try to be as simple as possible usually only containing 2 methods `search` and `save`.)

[comment]: <> (If we need some query with more filters we use the `Specification` pattern also known as `Criteria` pattern. So we add a)

[comment]: <> (`searchByCriteria` method.)

[comment]: <> (You can see an example [here]&#40;src/Mooc/Courses/Domain/CourseRepository.php&#41;)

[comment]: <> (and its implementation [here]&#40;src/Mooc/Courses/Infrastructure/Persistence/DoctrineCourseRepository.php&#41;.)

[comment]: <> (### Aggregates)

[comment]: <> (You can see an example of an aggregate [here]&#40;src/Mooc/Courses/Domain/Course.php&#41;. All aggregates should)

[comment]: <> (extend the [AggregateRoot]&#40;src/Shared/Domain/Aggregate/AggregateRoot.php&#41;.)

[comment]: <> (### Command Bus)

[comment]: <> (There is 1 implementations of the [command bus]&#40;src/Shared/Domain/Bus/Command/CommandBus.php&#41;.)

[comment]: <> (1. [Sync]&#40;src/Shared/Infrastructure/Bus/Command/InMemorySymfonyCommandBus.php&#41; using the Symfony Message Bus)

[comment]: <> (### Query Bus)

[comment]: <> (The [Query Bus]&#40;src/Shared/Infrastructure/Bus/Query/InMemorySymfonyQueryBus.php&#41; uses the Symfony Message Bus.)

[comment]: <> (### Event Bus)

[comment]: <> (The [Event Bus]&#40;src/Shared/Infrastructure/Bus/Event/InMemory/InMemorySymfonyEventBus.php&#41; uses the Symfony Message Bus.)

[comment]: <> (The [MySql Bus]&#40;src/Shared/Infrastructure/Bus/Event/MySql/MySqlDoctrineEventBus.php&#41; uses a MySql+Pulling as a bus.)

[comment]: <> (The [RabbitMQ Bus]&#40;src/Shared/Infrastructure/Bus/Event/RabbitMq/RabbitMqEventBus.php&#41; uses RabbitMQ C extension.)

[comment]: <> (## 📱 Monitoring)

[comment]: <> (Every time a domain event is published it's exported to Prometheus. You can access to the Prometheus panel [here]&#40;http://localhost:9999/&#41;.)

[comment]: <> (## 🤔 Contributing)

[comment]: <> (There are some things missing &#40;add swagger, improve documentation...&#41;, feel free to add this if you want! If you want)

[comment]: <> (some guidelines feel free to contact us :&#41;)

[comment]: <> (## 🤩 Extra)

[comment]: <> (This code was shown in the [From framework coupled code to #microservices through #DDD]&#40;http://codely.tv/screencasts/codigo-acoplado-framework-microservicios-ddd&#41; talk and doubts where answered in the [DDD y CQRS: Preguntas Frecuentes]&#40;http://codely.tv/screencasts/ddd-cqrs-preguntas-frecuentes/&#41; video.)

[comment]: <> (ción entre microservicios: Event-Driven Architecture]&#40;https://pro.codely.tv/library/comunicacion-entre-microservicios-event-driven-architecture/74823/about/&#41;)
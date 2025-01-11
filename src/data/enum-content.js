const company = `
/**
 * A Comprehensive List of Companies I Have Worked At.
 */

about Company: String {
    case Talent         = "Talent.com";
    case PopARide       = "Poparide.com";
    case SelfEmployed   = "stas.website/services";
}
`;

const project = `about Project {
    case Meowdb;
    case MetricFrame;
    case Mylang;
    case ResumeIDE;
}`;

const title = `about Title {
    case BusinessAnalyst;
    case WebDeveloper;
    case SeniorSoftwareEngineer;
    case DataEngineer;
    case JuniorDeveloper;
}`;

const google = `certification Google {
    case BusinessIntelligence;
    case AdvancedDataAnalytics;
    case CyberSecurity;
    case DigitalMarketing_And_ECommerce;
    case ProductManagement;
}`;

const code = `skill Code {
  case Debugging;
  case EventDrivenDevelopment;
}`;

const data = `skill Data {
    case Analysis;
    case DataEngineering;
    case DataWareHousing;
    case GraphDataBases;
    case DataVisualization;    
}`;

const product = `skill Product {
    case PerformanceMarketing;
    case TrafficArbitrage;
    case ABTesting;
    case EmailMarketing;
}`;

const dataviz = `tool DataViz {
    case Tableau;
    case PowerBI;
    case Grafana;
}`;

const db = `tool DB {
    case DuckDB;
    case ElasticSearch;
    case mySQL;

    // graph database
    case Neptune;
}`;

const lang = `tool Lang {
    // Data Wrangling Languages
    case R;
    case Python;    
    case Bash;

    // Scripting Languages
    case PHP;
    case JavaScript;
    case TypeScript;
    case Python;

    // Graph DataBase Query Languages
    case Gremlin;
    case OpenCypher;

    // MISC
    case CSS;
}`;

const lib = `tool Lib {
    // Data Wrangling
    case GGPlot2;
    case TidyVerse; // dplyr, tidyr, readr, tibble, stringr
    case Pandas;

    // Data Viz
    case Amcharts;

    // FrontEnd
    case React;

}
`;

const queue = `tool Queue {
    case AzureMessagingQueue;
    case AWSKafka;
    case RabbitMQ;
}`;

export default {
  README: "Welcome to the File Explorer!",
  company,
  project,
  title,
  google,
  code,
  data,
  product,
  dataviz,
  db,
  lang,
  lib,
  queue,
};

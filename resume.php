<?php


$resume = 

(new Resume())
  ->work_experience([
    (new Job())
      ->company(Company::SelfEmployed)
      ->date_range($from = 2024_05, $to = PRESENT) // 7 months
        ->roles([
          (new Role(Title::BusinessAnalyst))
            ->date_range($from = 2024_09, $to = PRESENT) // 7 months
            ->about([
              "Performed ad-hoc, root-cause, exploratory & product analyses",
              "Proposed UI/UX A/B Tests"
            ])
            ->skills(Data::Analysis, Product::PerformanceMarketing, Product::TrafficArbitrage, Product::ABTesting)
            ->tools(DataViz::Tableau, Lang::R, Lib::Pandas, Lang::Bash, Lib::GGPlot2, Lib::TidyVerse, DB::DuckDB)
          ,
          (new Role(Title::WebDeveloper))
            ->date_range($from = 2024_06, $to = 2024_08) // 2 months
            ->about(["Ported Over HRTech Company's webapp into a chrome extension"])
            ->tools(Lang::TypeScript, Lib::React, Queue::AzureMessagingQueue)
        ])
    ,

    (new Job())
    ->company(Company::Talent)
    ->date_range($from = 2018_05, $to = 2024_05) // 6 years
      ->roles([
        (new Role(Title::SeniorSoftwareEngineer))
          ->date_range($from = 2020_10, $to = 2024_05) // 3 years 7 months
          ->about([

          ])
          ->skills(
            Code::EventDrivenDevelopment,
            Data::Analysis, Data::DataWareHousing, Data::DataEngineering,
            Product::ABTesting, Product::EmailMarketing
          )
          ->tools(Lang::Gremlin, Lang::OpenCypher, Lang::PHP, Lang::JavaScript, Queue::AWSKafka,
              Queue::RabbitMQ, DataViz::PowerBI, DataViz::Grafana
          )
        ,
        (new Role([
          Title::JuniorDeveloper,
          Title::BusinessAnalyst
        ]))
          ->date_range($from = 2018_05, $to = 2020_10) // 2 years 3 months
          ->about([
            "Created New & Managed Legacy Internal Tools",
            "Collected & Prepared Data for a $53M Series A Investment",
          ])
          ->skills(Code::Debugging, Data::Analysis, Product::TrafficArbitrage)
          ->tools(DB::ElasticSearch, DB::mySQL),
      ])
  ])

  ->education([
    (new University())
      ->date_range($from = 2012_07, $to = 2016_01) // 4 years
      ->major("Business Management")
      ->school("Wittenberg University")
      ->accomplishments([
        "Tennis Scholarship",
        "Team Captain & Top Starter for Men's Varsity Tennis Team"
      ])
  ])

  ->certifications([
    Google::CyberSecurity, Google::BusinessIntelligence, Google::AdvancedDataAnalytics,
    Google::ProductManagement, Google::DigitalMarketing_And_ECommerce
  ])
  ->personal_projects([
    Project::Meowdb, Project::Mylang, Project::MetricFrame, Project::ResumeIDE
  ])
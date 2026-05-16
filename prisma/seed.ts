// FINTECH-CYBER-BACKEND/prisma/seed.ts
// Database seeding script for generating 12 months of realistic test data for John Doe
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import logger from "../logger.js";

const prisma = new PrismaClient();

/**
 * Main seeding function that generates 12 months of comprehensive financial data
 */
async function main() {
  try {
    logger.info(" Starting 12-month database seeding process...");

    // Clear existing data in correct order (child records first)
    logger.info(" Clearing existing database records...");

    const deleteOperations = [
      prisma.transactionMood.deleteMany(),
      prisma.securityLog.deleteMany(),
      prisma.securityEvent.deleteMany(),
      prisma.transaction.deleteMany(),
      prisma.recurringTransaction.deleteMany(),
      prisma.debt.deleteMany(),
      prisma.financialGoal.deleteMany(),
      prisma.budget.deleteMany(),
      prisma.account.deleteMany(),
      prisma.user.deleteMany(),
    ];

    await Promise.all(deleteOperations);
    logger.info(" Database cleared successfully");

    // Create John Doe with enhanced security fields
    const hashedPassword = await bcrypt.hash("password123", 12);

    const johnDoe = await prisma.user.create({
      data: {
        email: "john.doe@example.com",
        password: hashedPassword,
        name: "John Doe",
        isVerified: true,
        alertEmailEnabled: true,
        typicalLoginHours: ["09:00-17:00", "20:00-22:00"],
        knownIPs: ["192.168.1.100", "10.0.0.1"],
        lastUserAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    logger.info(` Created user: ${johnDoe.email}`);

    // Create bank accounts with realistic balances
    const checkingAccount = await prisma.account.create({
      data: {
        userId: johnDoe.id,
        name: "Primary Checking",
        balance: 4850.75,
      },
    });

    const savingsAccount = await prisma.account.create({
      data: {
        userId: johnDoe.id,
        name: "High-Yield Savings",
        balance: 18750.5,
      },
    });

    const creditCard = await prisma.account.create({
      data: {
        userId: johnDoe.id,
        name: "Rewards Credit Card",
        balance: -1250.0,
      },
    });

    logger.info(" Created 3 accounts: Checking, Savings, Credit Card");

    // Define categories for realistic transactions
    const categories = {
      income: [
        "Salary",
        "Freelance",
        "Investment",
        "Bonus",
        "Side Hustle",
        "Refund",
      ],
      expense: [
        "Food",
        "Transport",
        "Entertainment",
        "Bills",
        "Shopping",
        "Healthcare",
        "Education",
        "Travel",
        "Rent",
        "Utilities",
        "Insurance",
        "Subscriptions",
      ],
    };

    // Create budgets for each expense category (will be used for 12 months)
    const budgetTemplates = [
      {
        category: "Food",
        limit: 600,
        rolloverType: "partial",
        rolloverAmount: 50,
        allowExceed: true,
      },
      {
        category: "Transport",
        limit: 300,
        rolloverType: "none",
        rolloverAmount: 0,
        allowExceed: false,
      },
      {
        category: "Entertainment",
        limit: 200,
        rolloverType: "full",
        rolloverAmount: 0,
        allowExceed: true,
      },
      {
        category: "Bills",
        limit: 500,
        rolloverType: "none",
        rolloverAmount: 0,
        allowExceed: false,
      },
      {
        category: "Shopping",
        limit: 350,
        rolloverType: "partial",
        rolloverAmount: 30,
        allowExceed: true,
      },
      {
        category: "Healthcare",
        limit: 250,
        rolloverType: "full",
        rolloverAmount: 0,
        allowExceed: true,
      },
      {
        category: "Education",
        limit: 150,
        rolloverType: "none",
        rolloverAmount: 0,
        allowExceed: false,
      },
      {
        category: "Travel",
        limit: 400,
        rolloverType: "capped",
        rolloverAmount: 200,
        allowExceed: true,
      },
      {
        category: "Rent",
        limit: 1500,
        rolloverType: "none",
        rolloverAmount: 0,
        allowExceed: false,
      },
      {
        category: "Utilities",
        limit: 200,
        rolloverType: "none",
        rolloverAmount: 0,
        allowExceed: false,
      },
      {
        category: "Insurance",
        limit: 300,
        rolloverType: "none",
        rolloverAmount: 0,
        allowExceed: false,
      },
      {
        category: "Subscriptions",
        limit: 100,
        rolloverType: "none",
        rolloverAmount: 0,
        allowExceed: true,
      },
    ];

    for (const template of budgetTemplates) {
      await prisma.budget.create({
        data: {
          userId: johnDoe.id,
          category: template.category,
          limit: template.limit,
          spent: 0,
          period: "monthly",
          rolloverType: template.rolloverType,
          rolloverAmount: template.rolloverAmount,
          allowExceed: template.allowExceed,
          isActive: true,
        },
      });
    }

    logger.info(
      ` Created ${budgetTemplates.length} budgets across all expense categories`,
    );

    // Create long-term financial goals
    const goals = [
      {
        name: "Emergency Fund",
        target: 15000,
        current: 8750,
        deadline: new Date("2027-06-01"),
        category: "savings",
        allocationPercentage: 10,
      },
      {
        name: "Down Payment for House",
        target: 60000,
        current: 18500,
        deadline: new Date("2028-12-31"),
        category: "savings",
        allocationPercentage: 15,
      },
      {
        name: "European Vacation 2027",
        target: 8000,
        current: 2100,
        deadline: new Date("2027-05-15"),
        category: "vacation",
        allocationPercentage: 5,
      },
    ];

    for (const goal of goals) {
      await prisma.financialGoal.create({
        data: {
          userId: johnDoe.id,
          name: goal.name,
          targetAmount: goal.target,
          currentAmount: goal.current,
          deadline: goal.deadline,
          category: goal.category,
          allocationPercentage: goal.allocationPercentage,
          isActive: true,
          isCompleted: false,
        },
      });
    }

    logger.info(" Created 3 financial goals with realistic progress");

    // Generate 12 months of transactions (current month + 11 previous months)
    const today = new Date();
    const transactionMoods = [
      "happy",
      "stressed",
      "bored",
      "impulsive",
      "planned",
      "anxious",
      "excited",
      "regretful",
      "satisfied",
      "guilty",
    ];
    let totalTransactions = 0;
    let totalMoods = 0;

    // Monthly income patterns
    const monthlySalary = 5200;
    const occasionalFreelance = [0, 350, 0, 800, 0, 500, 0, 1200, 0, 0, 650, 0]; // Some months have freelance income

    // Expense descriptions for realistic variety
    const descriptions: { [key: string]: string[] } = {
      Food: [
        "Grocery store",
        "Restaurant - Italian",
        "Coffee shop",
        "Lunch delivery",
        "Fast food",
        "Farmers market",
        "Bakery",
        "Dinner with friends",
        "Pizza delivery",
        "Sushi takeout",
      ],
      Transport: [
        "Gas station",
        "Uber ride",
        "Public transit pass",
        "Car wash",
        "Parking garage",
        "Oil change",
        "Tire rotation",
        "Bus fare",
        "Train ticket",
      ],
      Entertainment: [
        "Movie tickets",
        "Concert tickets",
        "Streaming service",
        "Bowling night",
        "Museum admission",
        "Arcade",
        "Theater show",
        "Sports event",
      ],
      Bills: [
        "Electric bill",
        "Internet service",
        "Water bill",
        "Phone plan",
        "Gas bill",
        "Waste management",
      ],
      Shopping: [
        "Clothing store",
        "Electronics",
        "Home decor",
        "Online marketplace",
        "Department store",
        "Gift shop",
        "Shoe store",
      ],
      Healthcare: [
        "Doctor visit",
        "Pharmacy",
        "Dental cleaning",
        "Eye exam",
        "Health insurance copay",
        "Vitamins",
        "Gym membership",
      ],
      Education: [
        "Online course",
        "Books",
        "Software license",
        "Certification exam",
        "Workshop fee",
        "Tutorial subscription",
      ],
      Travel: [
        "Hotel booking",
        "Flight tickets",
        "Airbnb stay",
        "Car rental",
        "Travel insurance",
        "Souvenirs",
        "Airport parking",
      ],
      Rent: ["Monthly rent payment", "Rent"],
      Utilities: ["Electricity", "Water", "Natural gas", "Sewer"],
      Insurance: [
        "Car insurance",
        "Renters insurance",
        "Life insurance premium",
      ],
      Subscriptions: [
        "Netflix",
        "Spotify",
        "Amazon Prime",
        "Cloud storage",
        "News subscription",
        "Meal kit service",
      ],
    };

    // Generate transactions for each month
    for (let monthOffset = 0; monthOffset < 12; monthOffset++) {
      const monthDate = new Date(
        today.getFullYear(),
        today.getMonth() - monthOffset,
        1,
      );
      const daysInMonth = new Date(
        monthDate.getFullYear(),
        monthDate.getMonth() + 1,
        0,
      ).getDate();

      logger.info(
        ` Generating transactions for ${monthDate.toLocaleString("default", { month: "long", year: "numeric" })}`,
      );

      // INCOME TRANSACTIONS

      // 1. Monthly salary (always on the 1st or 15th)
      const salaryDate = new Date(
        monthDate.getFullYear(),
        monthDate.getMonth(),
        1,
      );
      await prisma.transaction.create({
        data: {
          accountId: checkingAccount.id,
          amount: monthlySalary,
          type: "income",
          category: "Salary",
          date: salaryDate,
          description: "Monthly salary deposit",
          flagged: false,
          riskScore: 5,
        },
      });
      totalTransactions++;

      // 2. Occasional freelance income (mid-month)
      const freelanceAmount = occasionalFreelance[monthOffset];
      if (freelanceAmount > 0) {
        const freelanceDate = new Date(
          monthDate.getFullYear(),
          monthDate.getMonth(),
          15,
        );
        await prisma.transaction.create({
          data: {
            accountId: checkingAccount.id,
            amount: freelanceAmount,
            type: "income",
            category: "Freelance",
            date: freelanceDate,
            description: [
              "Web development project",
              "Design work",
              "Consulting gig",
              "Writing project",
            ][Math.floor(Math.random() * 4)],
            flagged: false,
            riskScore: 8,
          },
        });
        totalTransactions++;
      }

      // 3. Investment dividends (quarterly: months 3, 6, 9, 12)
      if (monthOffset % 3 === 2) {
        const dividendDate = new Date(
          monthDate.getFullYear(),
          monthDate.getMonth(),
          20,
        );
        await prisma.transaction.create({
          data: {
            accountId: savingsAccount.id,
            amount: Math.floor(Math.random() * 150) + 50,
            type: "income",
            category: "Investment",
            date: dividendDate,
            description: "Quarterly dividend payment",
            flagged: false,
            riskScore: 3,
          },
        });
        totalTransactions++;
      }

      // EXPENSE TRANSACTIONS

      // Fixed monthly expenses
      const fixedExpenses = [
        {
          day: 1,
          amount: 1500,
          category: "Rent",
          description: "Monthly rent payment",
        },
        {
          day: 5,
          amount: 85.5,
          category: "Utilities",
          description: "Electric bill",
        },
        {
          day: 7,
          amount: 45.0,
          category: "Utilities",
          description: "Water bill",
        },
        {
          day: 10,
          amount: 55.0,
          category: "Utilities",
          description: "Internet service",
        },
        {
          day: 12,
          amount: 120.0,
          category: "Insurance",
          description: "Car insurance monthly",
        },
        {
          day: 15,
          amount: 15.99,
          category: "Subscriptions",
          description: "Netflix subscription",
        },
        {
          day: 15,
          amount: 9.99,
          category: "Subscriptions",
          description: "Spotify Premium",
        },
        {
          day: 16,
          amount: 12.99,
          category: "Subscriptions",
          description: "Amazon Prime",
        },
        { day: 20, amount: 85.0, category: "Bills", description: "Phone plan" },
        {
          day: 25,
          amount: 45.0,
          category: "Healthcare",
          description: "Gym membership",
        },
      ];

      for (const expense of fixedExpenses) {
        // Skip some subscriptions occasionally for variety
        if (expense.category === "Subscriptions" && Math.random() > 0.95)
          continue;

        const expenseDate = new Date(
          monthDate.getFullYear(),
          monthDate.getMonth(),
          Math.min(expense.day, daysInMonth),
        );
        await prisma.transaction.create({
          data: {
            accountId:
              expense.category === "Subscriptions"
                ? creditCard.id
                : checkingAccount.id,
            amount: -Math.abs(expense.amount),
            type: "expense",
            category: expense.category,
            date: expenseDate,
            description: expense.description,
            flagged: false,
            riskScore: Math.floor(Math.random() * 10),
          },
        });
        totalTransactions++;
      }

      // Variable expenses (25-40 per month for realistic spending patterns)
      const variableTransactionCount = Math.floor(Math.random() * 16) + 25;

      for (let i = 0; i < variableTransactionCount; i++) {
        const day = Math.floor(Math.random() * daysInMonth) + 1;
        const hour = Math.floor(Math.random() * 14) + 8; // 8 AM - 10 PM
        const minute = Math.floor(Math.random() * 60);

        const transactionDate = new Date(
          monthDate.getFullYear(),
          monthDate.getMonth(),
          day,
          hour,
          minute,
        );

        // Weight categories based on realistic spending patterns
        const weightedCategories = [
          "Food",
          "Food",
          "Food",
          "Food",
          "Food", // 5x weight - most frequent
          "Transport",
          "Transport",
          "Transport", // 3x
          "Entertainment",
          "Entertainment", // 2x
          "Shopping",
          "Shopping", // 2x
          "Healthcare", // 1x
          "Education", // 1x
          "Bills", // 1x
        ];

        const category =
          weightedCategories[
            Math.floor(Math.random() * weightedCategories.length)
          ];

        // Amount ranges based on category
        const amountRanges: { [key: string]: [number, number] } = {
          Food: [5, 85],
          Transport: [10, 65],
          Entertainment: [15, 120],
          Shopping: [20, 200],
          Healthcare: [10, 150],
          Education: [25, 100],
          Bills: [30, 150],
        };

        const [minAmount, maxAmount] = amountRanges[category];
        const amount = -(
          Math.floor(Math.random() * (maxAmount - minAmount)) + minAmount
        );

        // Select random description for the category
        const desc =
          descriptions[category]?.[
            Math.floor(Math.random() * descriptions[category].length)
          ] || `${category} expense`;

        // Determine if this should be on credit card (30% chance for certain categories)
        const useCreditCard =
          ["Shopping", "Entertainment", "Travel"].includes(category) &&
          Math.random() > 0.7;
        const account = useCreditCard ? creditCard : checkingAccount;

        // Flag some transactions for fraud detection (2% chance)
        const shouldFlag = Math.random() > 0.98;

        const transaction = await prisma.transaction.create({
          data: {
            accountId: account.id,
            amount: amount,
            type: "expense",
            category: category,
            date: transactionDate,
            description: desc,
            flagged: shouldFlag,
            fraudReason: shouldFlag
              ? "Unusual spending pattern detected"
              : null,
            riskScore: shouldFlag
              ? Math.floor(Math.random() * 40) + 60
              : Math.floor(Math.random() * 30),
            reviewed: shouldFlag ? Math.random() > 0.5 : false,
          },
        });

        // Add mood data to 25% of transactions
        if (Math.random() > 0.75) {
          const mood =
            transactionMoods[
              Math.floor(Math.random() * transactionMoods.length)
            ];
          const intensity = Math.floor(Math.random() * 10) + 1;

          await prisma.transactionMood.create({
            data: {
              transactionId: transaction.id,
              userId: johnDoe.id,
              mood: mood,
              intensity: intensity,
              notes:
                intensity > 7
                  ? "Strong emotional response to this purchase"
                  : intensity < 3
                    ? "Routine transaction, no strong feelings"
                    : null,
            },
          });
          totalMoods++;
        }

        totalTransactions++;
      }

      // Add 1-2 travel transactions in some months
      if (Math.random() > 0.75) {
        const travelDay = Math.floor(Math.random() * daysInMonth) + 1;
        const travelDate = new Date(
          monthDate.getFullYear(),
          monthDate.getMonth(),
          travelDay,
        );
        const travelAmount = -(Math.floor(Math.random() * 300) + 50);

        await prisma.transaction.create({
          data: {
            accountId: creditCard.id,
            amount: travelAmount,
            type: "expense",
            category: "Travel",
            date: travelDate,
            description:
              descriptions["Travel"][
                Math.floor(Math.random() * descriptions["Travel"].length)
              ],
            flagged: false,
            riskScore: Math.floor(Math.random() * 20),
          },
        });
        totalTransactions++;
      }
    }

    logger.info(
      ` Generated ${totalTransactions} transactions across 12 months`,
    );
    logger.info(
      ` Added ${totalMoods} transaction moods for behavioral analytics`,
    );

    // Update budget spent amounts based on last month's transactions
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const budgets = await prisma.budget.findMany({
      where: { userId: johnDoe.id },
    });

    for (const budget of budgets) {
      const transactions = await prisma.transaction.findMany({
        where: {
          account: { userId: johnDoe.id },
          type: "expense",
          category: budget.category,
          date: { gte: lastMonth },
        },
      });

      const totalSpent = transactions.reduce(
        (sum, tx) => sum + Math.abs(tx.amount),
        0,
      );

      await prisma.budget.update({
        where: { id: budget.id },
        data: { spent: totalSpent },
      });
    }

    logger.info(" Updated budget spent amounts for current month");

    // Create recurring transactions
    const recurringTemplates = [
      {
        description: "Netflix Subscription",
        amount: -15.99,
        category: "Subscriptions",
        frequency: "monthly",
        accountId: creditCard.id,
      },
      {
        description: "Spotify Premium",
        amount: -9.99,
        category: "Subscriptions",
        frequency: "monthly",
        accountId: creditCard.id,
      },
      {
        description: "Monthly Salary",
        amount: 5200.0,
        category: "Salary",
        frequency: "monthly",
        accountId: checkingAccount.id,
      },
      {
        description: "Gym Membership",
        amount: -45.0,
        category: "Healthcare",
        frequency: "monthly",
        accountId: checkingAccount.id,
      },
      {
        description: "Amazon Prime",
        amount: -12.99,
        category: "Subscriptions",
        frequency: "monthly",
        accountId: creditCard.id,
      },
      {
        description: "Internet Service",
        amount: -55.0,
        category: "Utilities",
        frequency: "monthly",
        accountId: checkingAccount.id,
      },
    ];

    for (const template of recurringTemplates) {
      const startDate = new Date(today);
      startDate.setMonth(startDate.getMonth() - 11); // Started 11 months ago

      const nextRun = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        startDate.getDate(),
      );

      await prisma.recurringTransaction.create({
        data: {
          userId: johnDoe.id,
          accountId: template.accountId,
          amount: Math.abs(template.amount),
          type: template.amount > 0 ? "income" : "expense",
          category: template.category,
          description: template.description,
          frequency: template.frequency,
          interval: 1,
          startDate: startDate,
          nextRunDate: nextRun,
          isActive: true,
          autoApprove: template.amount > 0 ? true : false,
          totalRuns: 11,
        },
      });
    }

    logger.info(" Created 6 recurring transactions");

    // Create debt records
    const debts = [
      {
        name: "Car Loan",
        type: "loan",
        principal: 25000,
        balance: 15200,
        interestRate: 4.5,
        minimumPayment: 385,
        termMonths: 60,
        paymentsMade: 24,
        lender: "Chase Auto Finance",
        startDate: new Date(today.getFullYear() - 2, today.getMonth(), 1),
      },
      {
        name: "Student Loan",
        type: "loan",
        principal: 35000,
        balance: 28400,
        interestRate: 5.8,
        minimumPayment: 350,
        termMonths: 120,
        paymentsMade: 18,
        lender: "Federal Student Aid",
        startDate: new Date(today.getFullYear() - 1, 6, 1),
      },
      {
        name: "Credit Card Balance",
        type: "credit_card",
        principal: 5000,
        balance: 1250,
        interestRate: 22.99,
        minimumPayment: 50,
        termMonths: 36,
        paymentsMade: 15,
        lender: "Chase Bank",
        startDate: new Date(today.getFullYear() - 1, 3, 1),
      },
    ];

    for (const debt of debts) {
      await prisma.debt.create({
        data: {
          userId: johnDoe.id,
          name: debt.name,
          type: debt.type as any,
          principal: debt.principal,
          balance: debt.balance,
          interestRate: debt.interestRate,
          minimumPayment: debt.minimumPayment,
          startDate: debt.startDate,
          dueDate: new Date(today.getFullYear(), today.getMonth(), 15),
          termMonths: debt.termMonths,
          paymentsMade: debt.paymentsMade,
          lender: debt.lender,
          isActive: true,
        },
      });
    }

    logger.info(" Created 3 debt records with realistic repayment progress");

    // Generate security logs for the past 30 days
    const securityActions = [
      "login_success",
      "login_failed",
      "password_change",
      "profile_update",
      "2fa_enabled",
      "alert_preferences_updated",
    ];

    for (let i = 0; i < 30; i++) {
      const logDate = new Date();
      logDate.setDate(logDate.getDate() - Math.floor(Math.random() * 30));
      logDate.setHours(Math.floor(Math.random() * 14) + 8);

      const action =
        securityActions[Math.floor(Math.random() * securityActions.length)];
      const isFailedLogin = action === "login_failed";

      await prisma.securityLog.create({
        data: {
          userId: johnDoe.id,
          action: action,
          ipAddress: isFailedLogin
            ? `203.0.113.${Math.floor(Math.random() * 255)}` // Suspicious IPs for failed logins
            : `192.168.1.${Math.floor(Math.random() * 255)}`, // Normal IPs
          userAgent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          timestamp: logDate,
          details: isFailedLogin
            ? "Failed login attempt - incorrect password"
            : "Regular security activity",
          riskScore: isFailedLogin
            ? Math.floor(Math.random() * 30) + 40
            : Math.floor(Math.random() * 20),
        },
      });
    }

    logger.info(" Generated 30 security logs with varied risk levels");

    // Create security events
    const securityEvents = [
      {
        type: "suspicious_transaction",
        severity: "medium",
        title: "Large online purchase flagged",
        message:
          "A transaction of $450 at an online electronics store was flagged for review",
        resolved: false,
      },
      {
        type: "unusual_login",
        severity: "low",
        title: "Login from new location",
        message:
          "Account accessed from Chicago, IL - first login from this location",
        resolved: true,
        resolvedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
      {
        type: "high_risk_activity",
        severity: "high",
        title: "Multiple failed login attempts",
        message: "5 failed login attempts detected within 10 minutes",
        resolved: false,
      },
    ];

    for (const event of securityEvents) {
      await prisma.securityEvent.create({
        data: {
          userId: johnDoe.id,
          type: event.type,
          severity: event.severity,
          title: event.title,
          message: event.message,
          resolved: event.resolved,
          resolvedAt: event.resolvedAt || null,
          metadata: {
            detectedBy: "automated_system",
            priority:
              event.severity === "high"
                ? 1
                : event.severity === "medium"
                  ? 2
                  : 3,
          },
        },
      });
    }

    logger.info(" Created 3 security events for testing alerts");

    // Log final summary
    logger.info("");
    logger.info(" 12-MONTH DATABASE SEEDING COMPLETED SUCCESSFULLY!");
    logger.info("");
    logger.info(" SEEDED DATA SUMMARY:");
    logger.info("    1 user created: john.doe@example.com");
    logger.info(
      "    3 accounts: Checking ($4,850.75), Savings ($18,750.50), Credit Card (-$1,250.00)",
    );
    logger.info("    12 budgets across all expense categories");
    logger.info("    3 financial goals with progress tracking");
    logger.info(`    ${totalTransactions} transactions across 12 months`);
    logger.info(`    ${totalMoods} transaction moods for behavioral analytics`);
    logger.info("    6 recurring transactions (salary, subscriptions, bills)");
    logger.info("    3 debts (Car Loan, Student Loan, Credit Card)");
    logger.info("    30 security logs (logins, alerts, profile updates)");
    logger.info(
      "    3 security events (suspicious activity, unusual login, failed attempts)",
    );
    logger.info("");
    logger.info(" TEST CREDENTIALS:");
    logger.info("   Email: john.doe@example.com");
    logger.info("   Password: password123");
    logger.info("   Accounts: Checking, Savings, Credit Card");
    logger.info("");
    logger.info(
      " DATA TIMELINE: Current month + 11 previous months (full year of history)",
    );
    logger.info(
      ' TIP: Budgets show current month spending. Click "Sync Budgets" to recalculate.',
    );
    logger.info("");
  } catch (error) {
    logger.error(" Critical error during database seeding:", error);
    throw error;
  }
}

// Execute seeding with proper error handling
main()
  .catch((e) => {
    logger.error("Seed process failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    try {
      await prisma.$disconnect();
      logger.debug("Database connection closed successfully");
    } catch (error) {
      logger.error("Error disconnecting from database:", error);
    }
  });

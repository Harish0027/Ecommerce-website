import AppAreaChart from "@/components/AppAreaChart";
import AppBarChart from "@/components/AppBarChart";
import AppPieChart from "@/components/AppPieChart";
import CardList from "@/components/CardList";
import TodoList from "@/components/TodoList";
import { auth } from "@clerk/nextjs/server";

const Homepage = async () => {
  const { getToken } = await auth();
  const token = await getToken();

  const orderChartData = fetch(
    `${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/order-chart`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((res) => res.json());
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppBarChart dataPromise={orderChartData} />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <CardList title="Latest Transactions" />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <AppPieChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <TodoList />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppAreaChart dataPromise={orderChartData} />
      </div>
      <div className="bg-primary-foreground p-6 rounded-lg shadow-sm border border-border">
        <h2 className="text-xl font-semibold mb-2">About Trendy</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <span className="font-medium text-primary">Trendy</span> is a modern
          e-commerce platform designed to bring you the latest fashion,
          lifestyle, and tech trends. We focus on providing a seamless shopping
          experience with curated collections, fast delivery, and secure
          payments — all powered by cutting-edge technology.
        </p>
        <p className="text-sm text-muted-foreground mt-3">
          From stylish apparel to must-have gadgets, Trendy keeps you ahead of
          the curve. Discover products you’ll love, built on a platform that’s
          fast, smart, and user-friendly.
        </p>
      </div>
    </div>
  );
};

export default Homepage;

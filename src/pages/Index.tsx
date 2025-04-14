
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-hr-purple-100 to-white">
      <div className="container mx-auto px-4 py-12">
        <header className="flex justify-between items-center py-8">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-hr-purple-300 flex items-center justify-center mr-2">
              <span className="font-bold text-white text-lg">H</span>
            </div>
            <span className="text-xl font-bold">HR Nexus</span>
          </div>
          <div>
            <Button asChild className="mr-4" variant="outline">
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild className="bg-hr-purple-300 hover:bg-hr-purple-400">
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </header>

        <main className="mt-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-gray-900">
              Streamline Your <span className="text-hr-purple-300">HR Operations</span> 
              <br />With Intelligent Solutions
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Comprehensive tools for employee management, leave tracking, attendance, 
              payroll processing, and more - all in one secure platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild className="bg-hr-purple-300 hover:bg-hr-purple-400 py-6 px-8 text-lg">
                <Link to="/login">Get Started</Link>
              </Button>
              <Button asChild variant="outline" className="py-6 px-8 text-lg">
                <a href="#features">Learn More</a>
              </Button>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8" id="features">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="h-12 w-12 rounded-full bg-hr-green flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Employee Management</h3>
              <p className="text-gray-600">
                Easily maintain employee records, documents, and organizational structure with 
                powerful directory features.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="h-12 w-12 rounded-full bg-hr-blue flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Leave & Attendance</h3>
              <p className="text-gray-600">
                Seamless leave application, approval workflows, and attendance tracking 
                with comprehensive reports.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="h-12 w-12 rounded-full bg-hr-yellow flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Payroll Processing</h3>
              <p className="text-gray-600">
                Automated payroll calculation, tax deductions, and customizable salary structures 
                with secure payslip generation.
              </p>
            </div>
          </div>
        </main>

        <footer className="mt-20 py-8 border-t border-gray-200">
          <div className="text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} HR Nexus Portal. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;

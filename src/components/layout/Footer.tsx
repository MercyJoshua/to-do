export default function Footer() {
    return (
      <footer className="w-full bg-gray-900 text-white py-6 mt-16">
        <div className="container mx-auto text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} TaskMaster. All rights reserved.</p>
        </div>
      </footer>
    );
  }
  
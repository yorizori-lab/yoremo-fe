export default function Footer() {
  return (
    <footer className="border-t py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} 레시피 매니저. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              이용약관
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              개인정보처리방침
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              고객센터
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
